<?php namespace Reuniors\Knk\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Reuniors\Knk\Models\Category;
use Reuniors\Knk\Models\Location;
use Reuniors\Base\Models\City;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use Tinify\Exception;

class MigrateKnk extends Command
{
    /**
     * @var string The console command name.
     */
    protected $name = 'knk:migrateknk';

    /**
     * @var string The console command description.
     */
    protected $description = 'php -dxdebug.mode=debug -dxdebug.client_host=127.0.0.1 -dxdebug.client_port=9003 -dxdebug.start_with_request=yes artisan knk:migrate';

    protected $falseCities = [
        'kulinarske-price',
        'recepti',
        'kuvari',
        'kg-gastro',
        'julian-bogdanovic',
        'test',
        'restorani-beograd',
        'kafane-beograd',
        'picerije-beograd',
        'poslastice-beograd',
        'brza-hrana-beograd',
        'dostava',
        'somelijei',
    ];

//    public function handle()
//    {
//
//        $locations = Location::with(['cover_image', 'gallery'])
//            ->get();
//        foreach ($locations as $location) {
//            $imagesDeleted = $coverDeleted = false;
//            if (!$location->cover_image) {
//                $image = $location->gallery->first();
//                if ($image) {
//                    $location->cover_image = $image;
//                    $location->save();
//                }
//            }
//        }
//    }

    public function removeAllImages($db)
    {
        $locations = Location::with(['cover_image', 'gallery'])
            ->inRandomOrder()
            ->get();
        $this->output->writeln('Remove images:');
        foreach ($locations as $location) {
            $count = 0;
            $this->output->writeln('Location: ' . $location->name);
            $imagesDeleted = $coverDeleted = false;
            if (!empty($location->gallery)) {
                $images = $location->gallery;
                foreach ($images as $image) {
                    $image->delete();
                    $count++;
                }
            }
            if ($location->cover_image !== null) {
                $location->cover_image->delete();
                $count++;
            }
            if ($location->logo !== null) {
//                if (file_exists($location->logo->getLocalPath())) {
//                }
                $location->logo->delete();
                $count++;
            }
            $this->output->writeln('Removed: ' . $count);
            $this->output->writeln('...');
        }
    }

    public function migrateOldMenus($db)
    {
        DB::transaction(function() use($db) {
            $existingLocations = Location::get()->keyBy('name');
            foreach ($existingLocations as $location) {

            }
        });
    }

    public function migrateData($db)
    {
        $isIgnore = (bool)$this->argument('ignore');

        DB::transaction(function() use($db, $isIgnore) {
            $cities = $db->table('wp_terms')
                ->select('wp_terms.name', 'wp_terms.slug', 'wp_terms.term_id', 'wp_term_taxonomy.term_taxonomy_id')
                ->join('wp_term_taxonomy', 'wp_term_taxonomy.term_id', '=', 'wp_terms.term_id')
                ->where('wp_term_taxonomy.taxonomy', 'category')
                ->where(function ($query) {
                    $query
                        ->where('wp_term_taxonomy.parent', 0)
                        ->orWhere('wp_term_taxonomy.parent', 101); // 101 Belgrade - For municipalities
                })
                ->whereNotIn('wp_terms.slug', $this->falseCities)
                ->where('wp_terms.term_id', '<>', 1)
                ->get()
                ->keyBy('term_taxonomy_id');
            $categoryByName = [];
            $categories = $db->table('wp_terms')
                ->select('wp_terms.name', 'wp_terms.slug', 'wp_terms.term_id', 'wp_term_taxonomy.term_taxonomy_id', 'wp_term_taxonomy.parent')
                ->join('wp_term_taxonomy', 'wp_term_taxonomy.term_id', '=', 'wp_terms.term_id')
                ->where('wp_term_taxonomy.taxonomy', 'category')
                ->where('wp_term_taxonomy.parent', '<>', 0)
                ->where(function ($query) {
                    $query
                        ->whereIn('wp_terms.slug', $this->falseCities)
                        ->orWhere('wp_term_taxonomy.parent', '<>', 101);  // 101 Belgrade - ignore municipalities
                })
                ->get()
                ->keyBy('term_taxonomy_id');
            $existingCities = City::get()
                ->keyBy('name');
            $existingCategories = Category::get()
                ->keyBy('name');
            $existingLocations = Location::with(['categories', 'gallery', 'cover_image'])
                ->get()
                ->keyBy('slug')
                ->map(function ($item) {
                    foreach (array_keys($item->getRelations()) as $relation) {
                        if (in_array($relation, ['categories'])) {
                            if ($item->relationLoaded($relation)) {
                                $item->setRelation($relation, $item->$relation->keyBy('id'));
                            }
                        }
                        if (in_array($relation, ['gallery'])) {
                            if ($item->relationLoaded($relation)) {
                                $item->setRelation($relation, $item->$relation->keyBy('file_name'));
                            }
                        }
                    }
                    return $item;
                });
            foreach ($cities as $city) {
                $cityName = camel_case(strtolower(Str::ascii($city->name)));
                if (isset($existingCities[$cityName])) {
                    $newCity = $existingCities[$cityName];
                } else {
                    $newCity = new City();
                }
                $newCity->title = $city->name;
                $newCity->name = camel_case(strtolower(Str::ascii($city->name)));
                $newCity->slug = $city->slug;
                $newCity->active = 1;
                if (!$isIgnore) {
                    $newCity->save();
                }
                $city->object = $newCity;
            }
            foreach ($categories as $category) {
                if (isset($cities[$category->parent])) {
                    $category->city = $cities[$category->parent];
                }
                if (isset($categories[$category->parent])) {
                    $category->parentCategory = $categories[$category->parent];
                    $categories[$category->parent]->isRegion = true;
                }
                $categorySlug = str_slug(strtolower($category->name));
                $categoryName = camel_case(strtolower(Str::ascii($category->name)));
//                $category->slug = $category;
                if (!isset($categoryByName[$categoryName])) {
                    $newCategory = isset($existingCategories[$categoryName])
                        ? $existingCategories[$categoryName]
                        : new Category();
                    $newCategory->title = $category->name;
                    $newCategory->name = $categoryName;
                    $newCategory->slug = $categorySlug;
                    $categoryByName[$categoryName] = $newCategory;
                }
                $category->object = $categoryByName[$categoryName];
            }
            foreach ($categoryByName as $category) {
                if (!isset($category->isRegion) && !$isIgnore) {
                    $category->save();
                }
            }
            $posts = $db->table('wp_posts')
                ->select('wp_posts.*', 'wp_term_relationships.term_taxonomy_id')
                ->leftJoin('wp_term_relationships', 'wp_term_relationships.object_id', 'wp_posts.ID')
                ->where('post_type', 'brza_hrana')
                ->where('post_status', 'publish')
                ->whereIn('post_title', [
                    'Pink Panter',
                    'Galija',
                    'My Soul',
                    'Merak',
                    'Restoran Vodenica',
                    'Casablanca 2',
                    'Casablanca',
                    'Trattoria Vapene',
                    'Cezar',
                    'Mladost',
                    'Konoba Akustik',
                    'Tel Aviv Hummus House',
                    'Restoran Novak',
                    'Kineski restoran Ni Hao',
                    'Na ćošku',
                    'Restoran Tabor'
                ])
                // ->orWhereIn('ID', [636, 837, 902, 910, 1007, 1022, 1036, 3198, 3205, 3229, 3233, 3244, 3257, 3265, 3621, 3767, 3826, 3864, 3893, 3986, 4045, 4602, 4627, 4640, 4683, 4702, 4914, 5408, 7145, 7259, 7280, 7292, 8316, 8535, 9764, 1103, 1117, 11299, 12391, 14346, 14358, 14374])
                ->get();
            $imagesPosts = $db->table('wp_posts')
                ->select('wp_posts.*', 'wp_term_relationships.term_taxonomy_id')
                ->leftJoin('wp_term_relationships', 'wp_term_relationships.object_id', 'wp_posts.ID')
                ->where('post_type', 'attachment')
                ->where('post_status', 'inherit')
                ->where('wp_posts.post_parent', '<>', 0)
                ->get()
                ->keyBy('ID');
            $postImagesAttachment = $db->table('wp_postmeta')
                ->where('meta_key', '_wp_attached_file')
                ->get();
            $deliveryAddresses = $db->table('wp_postmeta')
                ->whereIn(
                    'meta_key',
                    [
                        'prikazi_link_za_dostavu',
                        'link_za_dostavu',
                        'prikazi_broj_za_dostavu',
                        'broj_za_dostavu'
                    ]
                )
                ->get();
            $imagesPosts = collect($imagesPosts)->groupBy('post_parent');
            $postImagesAttachment = collect($postImagesAttachment)->groupBy('post_id');
            $deliveryAddresses = collect($deliveryAddresses)->groupBy('post_id');
            $posts = collect($posts)->groupBy('ID');
            $postCountPercent = count($posts) / 100;
            $counter = 0;
            foreach ($posts as $postList) {
                $counter++;
                $postCategories = [];
                foreach ($postList as $post) {
                    $postCategories[] = $post->term_taxonomy_id;
                }
                $title = $post->post_title;
                $invalidData = false;
//            foreach ($this->ignore as $search) {
//                if(preg_match("/{$search}/i", $title)) {
//                    $invalidData = true;
//                    break;
//                }
//            }
                if ($invalidData) {
                    continue;
                }
                $postName = camel_case(strtolower(Str::ascii($post->post_title)));
                $postSlug = $post->post_name;
                $location = isset($existingLocations[$postSlug])
                    ? $existingLocations[$postSlug]
                    : new Location();
                $location->name = $postName;
                $location->slug = $post->post_name;
                $location->text = $post->post_content;
                $location->title = $post->post_title;
                $location->snippet = $post->post_excerpt;
                $location->temp_old_id = $post->ID;
                $location->temp_old_pid = $post->post_parent;
                $location->address_data = [];
                $location->phone_data = [];
                $location->working_hours_data = [];
                $location->delivery_working_hours_data = [];
                if (isset($deliveryAddresses[$post->ID])) {
                    $addressByMetaKey = [];
                    foreach ($deliveryAddresses[$post->ID] as $address) {
                        $addressByMetaKey[$address->meta_key] = $address;
                    }
                    if (isset($addressByMetaKey['prikazi_link_za_dostavu'])
                        && !empty($addressByMetaKey['broj_za_dostavu']->meta_value)
                    ) {
                        $location->has_online_delivery = (bool)$addressByMetaKey['prikazi_link_za_dostavu']->meta_value;
                    }
                    if (isset($addressByMetaKey['link_za_dostavu'])
                        && !empty($addressByMetaKey['broj_za_dostavu']->meta_value)
                    ) {
                        $location->delivery_url_path = $addressByMetaKey['link_za_dostavu']->meta_value;
                    }
                    if (isset($addressByMetaKey['prikazi_broj_za_dostavu'])
                        && !empty($addressByMetaKey['broj_za_dostavu']->meta_value)
                    ) {
                        $location->delivery_url_path = $addressByMetaKey['link_za_dostavu']->meta_value;
                    }
                    if (isset($addressByMetaKey['broj_za_dostavu'])
                        && !empty($addressByMetaKey['broj_za_dostavu']->meta_value)
                    ) {
                        if ($addressByMetaKey['broj_za_dostavu']->meta_value == 'Za ovaj objekat omogućeno je online naručivanje') {
                            $location->setMetaData(0, 'phone_data', 'delivery_1');
                        } else{
                            $location->setMetaData(
                                $addressByMetaKey['broj_za_dostavu']->meta_value,
                                'phone_data',
                                'delivery_1'
                            );
                        }
                    }
                    if (isset($addressByMetaKey['prikazi_broj_za_dostavu'])
                        && !empty($addressByMetaKey['broj_za_dostavu']->meta_value)
                    ) {
                        $location->setMetaData(
                            (bool)$addressByMetaKey['prikazi_broj_za_dostavu']->meta_value,
                            'phone_data',
                            'delivery_show_number'
                        );
                    }
                }
                $location->forceSave();
//                if ($isIgnore) {
//                    continue;
//                }
                if (isset($cities[$post->term_taxonomy_id])) {
                    $location->city = $cities[$post->term_taxonomy_id]->object;
                } elseif (isset($categories[$post->term_taxonomy_id])) {
                    $category = $categories[$post->term_taxonomy_id];
                    if (!isset($category->isRegion) && !$location->categories->has($category->object->id)) {
                        $location->categories()->add($category->object);
                    }
                    if (isset($category->parentCategory)) {
                        $category = $category->parentCategory;
                    }
                    if (isset($category->parentCategory)) {
                        $category = $category->parentCategory;
                    }
                    if (isset($category->parentCategory)) {
                        $category = $category->parentCategory;
                    }
                    if (isset($category->city)) {
                        $location->city = $category->city->object;
                    }
                }
                $imagesLocalPath = 'D:\\temp\\';
//            $imagesLocalPath = '/var/www/knk-old';
                $imagePath = $imagesLocalPath .
//                preg_replace('/^http:\/\/kudanaklopu.com\//', '', $post->guid);
                    str_replace(
                        '/',
                        '\\',
                        preg_replace('/^http:\/\/(.*)kudanaklopu.com\//', '', $post->guid)
                    );
                if (file_exists($imagePath) && empty($location->cover_image)) {
                    $location->cover_image = $imagePath;
                }
                if (isset($imagesPosts[$post->ID])) {
                    foreach ($imagesPosts[$post->ID] as $imagePost) {
                        if (isset($postImagesAttachment[$imagePost->ID])) {
                            $imagePath = $imagesLocalPath . '\wp-content\uploads\\';
                            foreach ($postImagesAttachment[$imagePost->ID] as $postImage) {
                                $fileLocationExploded = explode('/', $postImage->meta_value);
                                $fileName = $fileLocationExploded[count($fileLocationExploded) - 1];
                                if (
                                    file_exists($imagePath . $postImage->meta_value)
                                    && !$location->gallery->has($fileName)
                                ) {
                                    $location->gallery()->create(['data' => $imagePath . $postImage->meta_value]);
                                    if (!isset($location->cover_image)) {
                                        $location->cover_image = $imagePath . $postImage->meta_value;
                                    }
                                } else {
                                    $error = 1;
                                }
                            }
                        }
                    }
                }
                $location->forceSave();
                $this->output->writeln(round($counter / $postCountPercent) . '%');
            }
        });
    }

    protected $availableActions = ['reset', 'removeAllImages', 'oldMenu'];

    /**
     * Execute the console command.
     * @return void
     */
    public function handle()
    {
        $db = DB::connection('mysql2');

        $actionName = $this->argument('action');
        if (!in_array($actionName, $this->availableActions)) {
            $this->output->error($actionName . ' is invalid');
            $this->output->error('Valid actions: ' . implode(', ', $this->availableActions));
            return;
        }
        if ($actionName === 'oldMenu') {
            $this->migrateOldMenus($db);
        } elseif ($actionName === 'reset') {
            $this->migrateData($db);
        } elseif($actionName === 'removeAllImages') {
            $this->removeAllImages($db);
        }

        $this->output->writeln('Kraj');
    }

    /**
     * Get the console command arguments.
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['action', InputArgument::REQUIRED, 'Action name is required'],
            ['ignore', InputArgument::OPTIONAL, 'Ignore creating cities, categories and pictures'],
        ];
    }

    /**
     * Get the console command options.
     * @return array
     */
    protected function getOptions()
    {
        return [];
    }
}
