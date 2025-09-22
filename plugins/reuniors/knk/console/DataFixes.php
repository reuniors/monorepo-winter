<?php namespace Reuniors\Knk\Console;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Excel;
use Reuniors\Knk\Classes\FoodMenuSync;
use Reuniors\Knk\Classes\Jobs\RestaurantMenuJobs;
use Reuniors\Knk\Classes\S;
use Reuniors\Knk\Console\Fragments\FixFoodData;
use Reuniors\Knk\Console\Fragments\FixLocationsData;
use Reuniors\Knk\Models\Food;
use Reuniors\Knk\Models\FoodAddonGroup;
use Reuniors\Knk\Models\FoodCategory;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\RegionCity;
use Reuniors\Knk\Models\RestaurantMenu;
use Reuniors\Base\Models\Tag;
use Symfony\Component\Console\Input\InputArgument;
use Illuminate\Support\Facades\DB;
use Winter\Storm\Network\Http;

class DataFixes extends Command
{
    /**
     * @var string The console command name.
     */
    protected $name = 'knk:datafixes';

    /**
     * @var string The console command description.
     */
    protected $description = 'Actions: foodTags';
    protected $availableActions = [
        'foodTags',
        'getLocationsLinks',
        'importCsvSaveTable',
        'importLocationsCsv',
        'fixTagsSlug',
        'fixTagsDuplicates',
        'removeMenu',
        'fixWorkingHoursSatSun',
        'generateLocationLink',
        'fixLocationsMainCategory',
        'fixLocationTexts',
        'fixLocationTextsOthers',
        'fixSnippetTexts',
        'populateFoodMenuDescription',
        'fixLocationRelations',
        'populateMissingTags',
        'populateMissingTagsFoodCategory',
        'fixInvalidTags',
        'fixLocationsCities',
        'locationWithoutCover',
        'similarFoodMenuLocations',
        'importSerbCities',
        'fixAddons',
        'fixLocationAddressAndPhoneData',
        'allLocationsImagesToWebp',
        'allFoodsImagesToWebp',
    ]; //

    /**
     * Execute the console command.
     * @return void
     */
    public function handle()
    {
        $actionName = $this->argument('action');
        if (!in_array($actionName, $this->availableActions)) {
            $this->output->error($actionName . ' is invalid');
            $this->output->error('Valid actions: ' . implode(', ', $this->availableActions));
            return;
        }
        switch ($actionName) {
            case 'foodTags':
                $this->fixFoodTags();
                break;
            case 'getLocationsLinks':
                $this->getLocationsLinks();
                break;
            case 'importCsvSaveTable':
                $this->importLocationsTablesFromCsv();
                break;
            case 'importLocationsCsv':
                $this->importLocationsFromCsv();
                break;
            case 'generateLocationLink':
                $this->generateLocationLinkFromCsv();
                break;
            case 'removeMenu':
                $slug = $this->argument('slug');
                if ($slug) {
                    RestaurantMenu::deleteMenuAndRelations($slug);
                }
                break;
            case 'fixTagsSlug':
                $this->fixTagSlugNameTitle();
                break;
            case 'fixTagsDuplicates':
                $this->fixTagsDuplicates();
                break;
            case 'fixWorkingHoursSatSun':
                $this->fixWorkingHoursSatSun();
                break;
            case 'fixLocationsMainCategory':
                $this->fixLocationsMainCategory();
                break;
            case 'fixLocationTexts':
                $this->fixLocationTexts();
                break;
            case 'fixLocationTextsOthers':
                $this->fixLocationTextsOthers();
                break;
            case 'fixSnippetTexts':
                $this->fixSnippetTexts();
                break;
            case 'populateFoodMenuDescription':
                $this->populateFoodMenuDescription();
                break;
            case 'fixLocationRelations':
                $this->fixLocationRelations();
                break;
            case 'populateMissingTags':
                $this->populateMissingTags();
                break;
            case 'populateMissingTagsFoodCategory':
                $this->populateMissingTagsFoodCategory();
                break;
            case 'fixInvalidTags':
                $this->fixInvalidTags();
                break;
            case 'fixLocationsCities':
                $this->fixLocationsCities();
                break;
            case 'locationWithoutCover':
                $this->locationWithoutCover();
                break;
            case 'similarFoodMenuLocations':
                $this->similarFoodMenuLocations();
                break;
            case 'importSerbCities':
                $this->importSerbCities();
                break;
            case 'fixAddons':
                $this->fixAddons();
                break;
            case 'fixLocationAddressAndPhoneData':
                FixLocationsData::fixLocationWorkingTimeAndPhoneData($this->output);
                break;
            case 'allLocationsImagesToWebp':
                FixLocationsData::allLocationsImagesToWebp($this->output);
                break;
            case 'allFoodsImagesToWebp':
                FixFoodData::allFoodsImagesToWebp($this->output);
                break;
        }

        $this->output->writeln('Kraj');
    }

    protected $defaultWorkingHours = [
        'from_day' => 'monday',
        'to_day' => 'friday',
        'monday_friday' =>
            [
                'start' => null,
                'end' => null,
            ],
        'saturday' =>
            [
                'start' => null,
                'end' => null,
            ],
        'sunday' =>
            [
                'start' => null,
                'end' => null,
            ],
        'monday' =>
            [
                'start' => null,
                'end' => null,
            ],
        'tuesday' =>
            [
                'start' => null,
                'end' => null,
            ],
        'wednesday' =>
            [
                'start' => null,
                'end' => null,
            ],
        'thursday' =>
            [
                'start' => null,
                'end' => null,
            ],
        'friday' =>
            [
                'start' => null,
                'end' => null,
            ],
    ];

    protected $columnNames = [
        0 => 'citySlug',
        1 => 'grad-restoran',
        2 => 'slug',
        3 => 'title',
        4 => 'donesi-link',
        5 => 'knk-link',
        6 => 'gugl-lokacija',
        7 => 'zatvoren',
        8 => 'phone-numbers',
        9 => 'address', // (Ulica;Broj;Mesto) Benetova;22;Kragujevac
        10 => 'working_time', // Radno vreme(radni dani) 9:00-15-00
        11 => 'working_time_sat',
        12 => 'working_time_sun',
        13 => 'delivery_working_time',
        14 => 'delivery_working_sat',
        15 => 'delivery_working_sun',
        16 => 'tags', // (tag1, tag2, tag3)
        17 => 'tags-badges', // Bedz Grupa (bedzeviZaRestorane)
        18 => 'other-info', // Ostale informacije (Wi-Fi, Parking, Pogodno za trudnice)
    ];

    protected $columnNamesKeys;

    protected $importedData;

    protected function getColumnNamesKeys()
    {
        return array_flip($this->columnNames);
    }

    protected function getRowWithColumnKeys($column)
    {
        $returnColumnData = [];
        $columnNamesKeys = $this->columnNames;
        foreach ($column as $index => $item) {
            if (isset($columnNamesKeys[$index])) {
                $returnColumnData[$columnNamesKeys[$index]] = trim($item);
            }
        }
        return $returnColumnData;
    }

    protected function importSerbCities()
    {
//        $citiesJson = Storage::disk('local')->get('uploads/private/serbianCities.json');
        $citiesJson = Http::get('https://gist.githubusercontent.com/urosran/98bc0de6f03c2fecc0b0e3fa15c706c5/raw/d0f73ae5b00b1e876fe3cece1a8d346e45fca757/srbija-svi-gradovi.json');
        $localCities = RegionCity::get()->keyBy('title');
        if ($citiesJson) {
            $cities = json_decode($citiesJson, true);
            $citiesNames = array_column($cities, 'city');
            foreach ($cities as $city) {
                if (!isset($localCities[($city['city'])])) {
                    RegionCity::create([
                        'active' => false,
                        'title' => $city['city'],
                        'slug' => Str::slug($city['city']),
                        'name' => Str::camel($city['city']),
                    ]);
                    $this->output->writeln($city['city']);
                }
            }
        }
    }

    protected function fixAddons()
    {
        $foodAddonGroups = FoodAddonGroup
            ::where(function ($query) {
                $query
                    ->where('type', null)
                    ->orWhere('type', '')
                    ->orWhere('input_type', null);
            })
            ->get();
        foreach ($foodAddonGroups as $foodAddonGroup) {
            if (empty($foodAddonGroup['input_type'])) {
                $foodAddonGroup['input_type'] = 'checkbox';
            }
            if ($foodAddonGroup['input_type'] == 'checkbox') {
                $foodAddonGroup['type'] = 'other';
            } else {
                $foodAddonGroup['type'] = 'size';
            }
            $foodAddonGroup->save();
        }
    }

    protected function getDayName($dayShortName)
    {
        $dayShortName = is_array($dayShortName) ? $dayShortName[0] : $dayShortName;
        $dayName = $this->dayMapper[trim($dayShortName)] ?? '';
        if (empty($dayName)) {
            throw new \Exception($dayName . ' not exists!');
        }
        return $dayName;
    }

    protected function getRealDateTime($timeFromTo)
    {
        $currentDateTimeFrom = Carbon::now();
        $currentDateTimeTo = Carbon::now();
        $timeExploded = explode('-', $timeFromTo);
        $startTime = trim($timeExploded[0]);
        $endTime = trim($timeExploded[1]) != '24' ? trim($timeExploded[1]) : '00:00';
        $currentDateTimeFrom->setTimeFromTimeString($startTime);
        $currentDateTimeTo->setTimeFromTimeString($endTime);
        return [
            'start' => $currentDateTimeFrom->toDateTimeString(),
            'end' => $currentDateTimeTo->toDateTimeString(),
        ];
    }

    protected function getWorkingHoursData($workingHours, $dateTimeString)
    {
        $dateTimeReturn = $workingHours;
        $dateTimeReturn['from_day'] = 'monday';
        $dateTimeReturn['to_day'] = 'friday';
        $dateTimeDataExploded = explode(',', trim($dateTimeString));
        foreach ($dateTimeDataExploded as $dateTimeExtended) {
            $dateTimeExploded = explode(' ', trim($dateTimeExtended));
            if (isset($dateTimeExploded[1])) {
                $daysExploded = explode('-', trim($dateTimeExploded[1]));
                if (isset($daysExploded[1])) {
                    $dateTimeReturn['from_day'] = $this->getDayName($daysExploded[0]);
                    $dateTimeReturn['to_day'] = $this->getDayName($daysExploded[1]);
                    $dateTimeReturn['monday_friday'] = $this->getRealDateTime($dateTimeExploded[0]);
                } else {
                    $dateTimeReturn[$this->getDayName($daysExploded[0])] = $this->getRealDateTime($dateTimeExploded[0]);
                }
            } else {
                $dateTimeReturn['monday_friday'] = $this->getRealDateTime($dateTimeExploded[0]);
            }
        }
        return $dateTimeReturn;
    }

    public function getLocationsLinks()
    {
        $locations = Location
            ::whereHas('restaurant_menu', function($query) {
                $query->where('outsource', 'kk');
            })
            ->with(['city', 'categories'])
            ->get();
        $knkSite = 'knk.reuniors.com';
        foreach ($locations as $location) {
            $citySLug = $location->city->slug;
            $categorySlug = $location->categories->first()->slug;
            $slug = $location->slug;
            $this->output->writeln("$knkSite/$citySLug/$categorySlug/$slug");
        }
    }

    public function generateLocationLinkFromCsv()
    {
        $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader("Xlsx");
        $spreadsheet = $reader->load(storage_path('temp\knk-locations.xlsx'));
        $importedLocations = $spreadsheet->getActiveSheet()->toArray();
        array_shift($importedLocations);
        $this->columnNamesKeys = $this->getColumnNamesKeys();
        $menuDataSync = new FoodMenuSync();
        $setOrEmpty = function (array $string, int $index) {
            return trim($string[$index] ?? '') ?? '';
        };
        foreach ($importedLocations as $index => $oneImportedLocation) {
            $oneImportedLocationFixed = $this->getRowWithColumnKeys($oneImportedLocation);
            $citySlug = $oneImportedLocationFixed['citySlug'];
            $slug = $oneImportedLocationFixed['slug'];
            $locationModel = Location::where('slug', $oneImportedLocationFixed['slug'])
                ->whereHas('city', function ($query) use ($oneImportedLocationFixed) {
                    $query->where('slug', $oneImportedLocationFixed['citySlug']);
                })
                ->with('categories')
                ->first();
            if ($locationModel === null) {
                $this->output->writeln('/');
                continue;
            }
            $categorySlug = $locationModel->firstCategory ? $locationModel->firstCategory->slug : null;
            if ($categorySlug) {
                $this->output->writeln("https://knk.reuniors.com/$citySlug/$categorySlug/$slug/jelovnik");
            } else {
                $this->output->writeln($slug . ' category not extist!');
            }
        }
    }

    public function importLocationsFromCsv()
    {
        $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader("Xlsx");
        $spreadsheet = $reader->load(storage_path('temp\knk-locations.xlsx'));
        $importedLocations = $spreadsheet->getActiveSheet()->toArray();
        array_shift($importedLocations);
        $this->columnNamesKeys = $this->getColumnNamesKeys();
        $menuDataSync = new FoodMenuSync();
        $setOrEmpty = function (array $string, int $index) {
            return trim($string[$index] ?? '') ?? '';
        };
        foreach ($importedLocations as $index => $oneImportedLocation) {
//            if ($index < 910) {
//                continue;
//            }
            $oneImportedLocationFixed = $this->getRowWithColumnKeys($oneImportedLocation);
            $locationModel = Location::where('slug', $oneImportedLocationFixed['slug'])
                ->whereHas('city', function ($query) use ($oneImportedLocationFixed) {
                    $query->where('slug', $oneImportedLocationFixed['citySlug']);
                })
                ->first();
            if ($locationModel === null) {
                $this->output->writeln("Restoran red: $index, ne postoji ({$oneImportedLocationFixed['slug']})");
                continue;
            }
            try {
//                if (!empty($oneImportedLocationFixed['donesi-link'])) {
//                    $menuDataSync->syncDataFromDonesi([
//                        'url' => $oneImportedLocationFixed['donesi-link'],
//                        'location_id' => $locationModel->id,
//                    ]);
//                } else
                if (!empty($oneImportedLocationFixed['knk-link'])) {
                    $menuDataSync->syncDataFromOldMenu([
                        'url' => $oneImportedLocationFixed['knk-link'],
                        'location_id' => $locationModel->id,
                    ]);
                }

                $workingData = $locationModel->working_hours_data;
                $deliveryWorkingData = $locationModel->delivery_working_hours_data;
                if (empty($workingData)) {
                    $workingData = $this->defaultWorkingHours;
                }
                if (empty($deliveryWorkingData)) {
                    $deliveryWorkingData = $this->defaultWorkingHours;
                }
                if (!empty($oneImportedLocationFixed['zatvoren'])) {
                    $locationModel->is_closed = (bool)$oneImportedLocationFixed['zatvoren'];
                }
                if (!empty($oneImportedLocationFixed['address']) && $oneImportedLocationFixed['address'] != 'ima') {
                    $addressDataExploded = explode(';', $oneImportedLocationFixed['address']);
                    $locationModel->address_data = [
                        'street' => trim($addressDataExploded[0]),
                        'street_number' => trim($addressDataExploded[1]),
                        'municipality' => trim($addressDataExploded[2]),
                    ];
                }
                if (!empty($oneImportedLocationFixed['phone-numbers'])) {
                    $phoneNumbersExploded = explode(',', $oneImportedLocationFixed['phone-numbers']);
                    $locationModel->phone_data = [
                        'phone_1' => $setOrEmpty($phoneNumbersExploded, 0),
                        'phone_2' => $setOrEmpty($phoneNumbersExploded, 1),
                        'mobile_1' => $setOrEmpty($phoneNumbersExploded, 2),
                        'mobile_2' => $setOrEmpty($phoneNumbersExploded, 3),
                    ];
                }
                if (empty($locationModel->phone_data)) {
                    $locationModel->phone_data = [];
                }
                if (!empty($oneImportedLocationFixed['working_time'])) {
                    $workingData = $this->getWorkingHoursData(
                        $this->defaultWorkingHours,
                        $oneImportedLocationFixed['working_time']
                    );
                }
                if (!empty($oneImportedLocationFixed['working_time_sat'])) {
                    $workingData['saturday'] = $this->getRealDateTime($oneImportedLocationFixed['working_time_sat']);
                }
                if (!empty($oneImportedLocationFixed['working_time_sun'])) {
                    $workingData['sunday'] = $this->getRealDateTime($oneImportedLocationFixed['working_time_sun']);
                }
                if (!empty($oneImportedLocationFixed['delivery_working_time'])) {
                    $deliveryWorkingData = $this->getWorkingHoursData(
                        $this->defaultWorkingHours,
                        $oneImportedLocationFixed['delivery_working_time']
                    );
                }
                if (!empty($oneImportedLocationFixed['delivery_working_time_sat'])) {
                    $deliveryWorkingData['saturday'] = $this->getRealDateTime($oneImportedLocationFixed['delivery_working_time_sat']);
                }
                if (!empty($oneImportedLocationFixed['delivery_working_time_sun'])) {
                    $deliveryWorkingData['sunday'] = $this->getRealDateTime($oneImportedLocationFixed['delivery_working_time_sun']);
                }
                $locationModel->working_hours_data = $workingData;
                $locationModel->delivery_working_hours_data = $deliveryWorkingData;
                $locationModel->forceSave();
            } catch (\Exception $e) {
                $this->output->writeln("Doslo je do greske! red: $index, lokacija: ({$oneImportedLocationFixed['slug']})");
                $this->output->writeln("Greska: ({$e->getMessage()})");
                $this->output->writeln("-------------------------------------------------------------");
            }
        }

        return null;
    }

    public function importLocationsTablesFromCsv()
    {
        $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader("Xlsx");
        $spreadsheet = $reader->load(storage_path('temp\knk-locations.xlsx'));
        $importedLocations = $spreadsheet->getActiveSheet()->toArray();
        array_shift($importedLocations);
        $this->columnNamesKeys = $this->getColumnNamesKeys();
        $menuDataSync = new FoodMenuSync();
        $setOrEmpty = function (array $string, int $index) {
            return trim($string[$index] ?? '') ?? '';
        };
        foreach ($importedLocations as $index => $oneImportedLocation) {
            $oneImportedLocationFixed = $this->getRowWithColumnKeys($oneImportedLocation);
            $locationModel = Location::where('slug', $oneImportedLocationFixed['slug'])
                ->whereHas('city', function ($query) use ($oneImportedLocationFixed) {
                    $query->where('slug', $oneImportedLocationFixed['citySlug']);
                })
                ->first();
            if ($locationModel === null) {
                $this->output->writeln("Restoran red: $index, ne postoji ({$oneImportedLocationFixed['slug']})");
                continue;
            }
            try {
                if (!empty($oneImportedLocationFixed['knk-link'])) {
                    $menuDataSync->oldMenuUpdateTempLocationTable([
                        'url' => $oneImportedLocationFixed['knk-link'],
                        'location_id' => $locationModel->id,
                    ]);
                }
            } catch (\Exception $e) {
                $this->output->writeln("Doslo je do greske! red: $index, lokacija: ({$oneImportedLocationFixed['slug']})");
                $this->output->writeln("Greska: ({$e->getMessage()})");
                $this->output->writeln("-------------------------------------------------------------");
            }
        }

        return null;
    }


    public function fixFoodTags()
    {
        $foods = Food::where('tag_id', '!=', null)
            ->get();
        $tags = Tag::get();
        foreach ($foods as $oneFood) {
            $foodTag = $tags->where('title', $oneFood->title)->first();
            if ($foodTag && $foodTag->id !== $oneFood->tag_id) {
                $this->output->writeln('tag: ' . $foodTag->title . '; food: ' . $oneFood->title);
                $oneFood->tag_id = $foodTag->id;
                $oneFood->save();
            }
        }
    }

    public function fixTagSlugNameTitle()
    {
        $tags = Tag::where('tag_group_id', null)
            ->get();
        foreach ($tags as $oneTag) {
            $slug = $oneTag->slug;
            $newTag = [];
            if (\Str::contains($slug, '-it-')) {
                $slugExploded = explode('-', $slug);
                foreach ($slugExploded as $slugPart) {
                    if ($slugPart == 'it') {
                        break;
                    }
                    $newTag[] = $slugPart;
                }
            }
            if (!empty($newTag)) {
                $slug = implode('-', $newTag);
            }
            if (preg_match('/\\d/', $slug) > 0) {
                $newTagTemp = [];
                $slugExploded = explode('-', $slug);
                $isFirst = true;
                $hasNumbers = false;
                foreach ($slugExploded as $slugPart) {
                    if (!$isFirst && preg_match('/\\d/', $slugPart) > 0) {
                        $hasNumbers = true;
                        break;
                    }
                    $isFirst = false;
                    $newTagTemp[] = $slugPart;
                }
                if ($hasNumbers && !empty($newTagTemp)) {
                    $newTag = $newTagTemp;
                }
            }
            if (!empty($newTag)) {
                $slug = implode('-', $newTag);
                $title = ucfirst(implode(' ', $newTag));
                $name = S::camel($title);

                $oneTag->slug = $slug;
                $oneTag->title = $title;
                $oneTag->name = $name;

                $oneTag->save();
                $this->output->writeln('slug: ' . $oneTag->slug . ' name: ' . $oneTag->name . ' title: ' . $oneTag->title);
            }
        }
    }

    public function fixTagsDuplicates()
    {
        $allFoodTags = Tag::where('tag_group_id', null)
            ->get();
        // $allFoods = Food::all();
        $loadedTags = [];
        foreach ($allFoodTags as $oneTag) {
            if (!isset($loadedTags[$oneTag->slug])) {
                $loadedTags[$oneTag->slug] = $oneTag;
                continue;
            }
            $noneFoods = true;
            $existingTag = $loadedTags[$oneTag->slug];
            $foodsWithTag = Food::where('tag_id', $oneTag->id)->get();
            if (!empty($foodsWithTag)) {
                foreach ($foodsWithTag as $food) {
                    $food->tag_id = $existingTag->id;
                    $food->save();
                    $noneFoods = false;
                }
            }
            if (!$noneFoods) {
                $this->output->writeln('Duplikat: ' . $oneTag->slug);
            } else {
                $oneTag->delete();
            }
        }
    }

    public function fixWorkingHoursSatSun()
    {
        $locations = Location::all();
        foreach ($locations as $location) {
            $isChanged = false;
            if ($location->working_hours_data) {
                $workingData = $location->working_hours_data;
                if (!isset($workingData['from_day'])) {
                    $workingData['from_day'] = 'monday';
                    $workingData['to_day'] = 'friday';
                    $isChanged = true;
                }
                if (isset($workingData['saturday']) && is_string($workingData['saturday'])) {
                    $workingData['saturday'] = $this->getRealDateTime($workingData['saturday']);
                    $isChanged = true;
                }
                if (isset($workingData['sunday']) && is_string($workingData['sunday'])) {
                    $workingData['sunday'] = $this->getRealDateTime($workingData['sunday']);
                    $isChanged = true;
                }
                if ($isChanged) {
                    $location->working_hours_data = $workingData;
                    $location->forceSave();
                }
            }
            $isChanged = false;
            if ($location->delivery_working_hours_data) {
                $deliveryWorkingData = $location->delivery_working_hours_data;
                if (!isset($deliveryWorkingData['from_day'])) {
                    $deliveryWorkingData['from_day'] = 'monday';
                    $deliveryWorkingData['to_day'] = 'friday';
                    $isChanged = true;
                }
                if (isset($deliveryWorkingData['saturday']) && is_string($deliveryWorkingData['saturday'])) {
                    $deliveryWorkingData['saturday'] = $this->getRealDateTime($deliveryWorkingData['saturday']);
                    $isChanged = true;
                }
                if (isset($deliveryWorkingData['sunday']) && is_string($deliveryWorkingData['sunday'])) {
                    $deliveryWorkingData['sunday'] = $this->getRealDateTime($deliveryWorkingData['sunday']);
                    $isChanged = true;
                }
                if ($isChanged) {
                    $location->delivery_working_hours_data = $deliveryWorkingData;
                    $location->forceSave();
                }
            }
        }
    }

    public function fixLocationsMainCategory()
    {
        $categoriesByPriority = [
            'zatvoreniObjekti',
            'dostava',
            'poslastice',
            'picerije',
            'brzaHrana',
            'kafane',
            'restorani',
        ];
        $locations = Location::with('categories')->get();
        foreach ($locations as $oneLocation) {
            /** @var Collection $locationCategories */
            $locationCategories = $oneLocation->categories;
            foreach ($categoriesByPriority as $categoryName) {
                $existingCategory = $locationCategories->firstWhere('name', $categoryName);
                if ($existingCategory) {
                    $oneLocation->main_category_id = $existingCategory->id;
                    $oneLocation->forceSave();
                    break;
                }
            }
        }
    }

    public function fixLocationTexts()
    {
        $allLocations = Location::all();
        foreach ($allLocations as $location) {
            $text = $location->text;
            if (empty($text)) {
                continue;
            }
            $regex = '/^\[(.*)\]/';
            preg_match($regex, $text, $matches);
            if (isset($matches[0])) {
                try {
                    $removeStrLength = strlen($matches[0]);
                    $updatedText = trim(substr($text, $removeStrLength, strlen($text)));
                    $location->text = $updatedText;
                    $location->snippet = $this->getSnippetText($updatedText);
                    $location->forceSave();
                } catch (\Exception $e) {
                    $this->output->writeln("Doslo je do greske! Lokacija: ({$location['slug']})");
                    $this->output->writeln("Greska: ({$e->getMessage()})");
                    $this->output->writeln("-------------------------------------------------------------");
                }
            }
        }
    }

    public function fixLocationTextsOthers()
    {
        $allLocations = Location::all();
        foreach ($allLocations as $location) {
            $text = $location->text;
            if (empty($text)) {
                continue;
            }
            $regex = '/\[(.*)\]/';
            preg_match($regex, $text, $matches);
            if (isset($matches[1]) && strpos($matches[1], 'soliloquy') !== false) {
                try {
                    $oldStr = $matches[1];
                    $updatedText = trim(str_replace($oldStr, '', $text));
                    $updatedText = trim(str_replace('[]', '', $updatedText));
                    $location->text = $updatedText;
                    $location->snippet = $this->getSnippetText($updatedText);
                    $location->forceSave();
                } catch (\Exception $e) {
                    $this->output->writeln("Doslo je do greske! Lokacija: ({$location['slug']})");
                    $this->output->writeln("Greska: ({$e->getMessage()})");
                    $this->output->writeln("-------------------------------------------------------------");
                }
            }
        }
    }

    public function fixSnippetTexts()
    {
        $allLocations = Location::all();
        foreach ($allLocations as $location) {
            try {
                $location->snippet = $this->getSnippetText($location->text);
                $location->forceSave();
            } catch (\Exception $e) {
                $this->output->writeln("Doslo je do greske! Lokacija: ({$location['slug']})");
                $this->output->writeln("Greska: ({$e->getMessage()})");
                $this->output->writeln("-------------------------------------------------------------");
            }
        }
    }

    public function populateFoodMenuDescription()
    {
        RestaurantMenuJobs::populateDescriptions(null, true);
    }

    protected function getSnippetText($text)
    {
        $text = strip_tags($text);
        $text = str_replace('&nbsp;', '', $text);
        return substr($text, 0, 120);
    }

    public function fixLocationRelations()
    {
        $allFoods = Food
            ::with([
                'food_category.restaurant_menus.locations',
            ])
            ->get();
        foreach ($allFoods as $food) {
            if ($food->food_category
                && $food->food_category->restaurant_menus->isNotEmpty()
                && $food->food_category->restaurant_menus->first()->locations->isNotEmpty()
            ) {
                $location = $food->food_category->restaurant_menus->first()->locations->first();
                $food->locations()->sync([
                    $location->id
                ]);
            }
        }
        $this->output->writeln("Hrana uspesno zavrsena");
        $allFoodCategories = FoodCategory
            ::with([
                'restaurant_menus.locations',
            ])
            ->get();
        foreach ($allFoodCategories as $foodCategory) {
            if ($foodCategory->restaurant_menus->isNotEmpty()
                && $foodCategory->restaurant_menus->first()->locations->isNotEmpty()
            ) {
                $location = $foodCategory->restaurant_menus->first()->locations->first();
                $foodCategory->locations()->sync([
                    $location->id
                ]);
            }
        }
    }

    public function populateMissingTags()
    {
        $allTags = Tag
            ::select()
            ->selectRaw("length(slug) - length(replace(slug, '-', '')) + 1 as words_num")
            ->orderByDesc('words_num')
            ->having('words_num', '<', 5)
            ->get();
        $allFoods = Food
            ::where('tag_id', null)
            ->where('id', 37919)
            ->get();
        foreach ($allFoods as $food) {
            $foodSlugExploded = explode('-', $food->slug);
            $tag = $allTags->first(function ($tagData) use ($foodSlugExploded) {
                $tagSlugExploded = explode('-', $tagData->slug);
                foreach ($tagSlugExploded as $tagSlugPart) {
                    if (!in_array($tagSlugPart, $foodSlugExploded)) {
                        return false;
                    }
                }
                return true;
            });
            if ($tag) {
                $food->tag_id = $tag->id;
                $food->forceSave();
                $this->output->writeln('SAVE: ' . $food->title . " ; $tag->title");
            } else {
                if (count($foodSlugExploded) <= 2) {
                    $tagData = new Tag();
                    $tagData->name = S::camel($food->title);
                    $tagData->slug = $food->slug;
                    $tagData->title = $food->title;
                    $tagData->save();
                    $this->output->writeln("NEW TAG: $tag->name");
                }
                $this->output->writeln($food->title . " $food->id");
            }
        }
    }

    public function populateMissingTagsFoodCategory()
    {
        $allTags = Tag
            ::select()
            ->selectRaw("length(title) - length(replace(title, ' ', '')) + 1 as words_num")
            ->orderByDesc('words_num')
            ->having('words_num', '<', 5)
            ->get();
        $allFoodCategories = FoodCategory
            ::where('tag_id', null)
            ->get();
        foreach ($allFoodCategories as $foodCategory) {
            $foodSlugExploded = explode('-', $foodCategory->slug);
            $tag = count($foodSlugExploded) > 4 ? null : $allTags->first(function ($tagData) use ($foodSlugExploded) {
                $tagSlugExploded = explode('-', $tagData->slug);
                foreach ($tagSlugExploded as $tagSlugPart) {
                    if (!in_array($tagSlugPart, $foodSlugExploded)) {
                        return false;
                    }
                }
                return true;
            });
            if ($tag) {
                $foodCategory->tag_id = $tag->id;
                $foodCategory->forceSave();
                $this->output->writeln('SAVE: ' . $foodCategory->title . " $tag->title");
            } else {
                if (count($foodSlugExploded) <= 2) {
                    $tagData = new Tag();
                    $tagData->name = S::camel($foodCategory->title);
                    $tagData->slug = $foodCategory->slug;
                    $tagData->title = $foodCategory->title;
                    $tagData->save();
                    $this->output->writeln("NEW TAG: $tagData->name");
                    $foodCategory->tag_id = $tagData->id;
                    $foodCategory->forceSave();
                }
                $this->output->writeln($foodCategory->title . " $foodCategory->id");
            }
        }
    }

    public function fixInvalidTags()
    {
        $duplicateTagIds = [
            '1106' => '36',
            '15615' => '15607',
            '17854' => '414',
            '17855' => '413',
            '17899' => '17871',
            '18013' => '14220',
            '18197' => '12599',
            '18374' => '18149',
        ];
        $ids = array_keys($duplicateTagIds);
        $foods = Food::whereIn('tag_id', $ids)->get();
        $foodCategories = FoodCategory::whereIn('tag_id', $ids)->get();
        foreach ($foods as $food) {
            if ($duplicateTagIds[$food->tag_id]) {
                $food->tag_id = $duplicateTagIds[$food->tag_id];
                $food->save();
            }
        }
        foreach ($foodCategories as $foodCategory) {
            if ($duplicateTagIds[$foodCategory->tag_id]) {
                $foodCategory->tag_id = $duplicateTagIds[$foodCategory->tag_id];
                $foodCategory->save();
            }
        }
        $allTags = Tag::whereIn('id', $ids)->delete();
    }

    public function fixLocationsCities()
    {
        $cityId = 1012;
        $bgCityId = 1007;
        $city = RegionCity::where('id', $cityId);
        $locationTitles = [];
        foreach ($locationTitles as $title) {
            $locations = Location::where('title', $title)
                ->whereIn('city_id', [$bgCityId, $cityId])
                ->get();
            if ($locations->count() > 1) {
                $this->output->writeln(' ');
                $this->output->writeln("POSTOJI vise istih lokacija: $title");
                $this->output->writeln(' ');
                break;
            }
            $location = $locations->first();
            if ($location) {
                if ($location->city_id === $cityId) {
                    $this->output->writeln("$title - je vec bila azurirana");
                } else {
                    $location->city_id = $cityId;
                    $location->forceSave();
                }
            } else {
                $this->output->writeln('----');
                $this->output->writeln("Lokacija ne postoji: $title");
                $this->output->writeln('----');
            }
        }
    }

    public function similarFoodMenuLocations()
    {
        $foodMenuSlugs = [
        ];
        $foodMenuIds = array_keys($foodMenuSlugs);
        $categories = [
            'restoran',
            'kafana',
            'brza-hrana',
            'poslasticarnica',
            'picerija',
        ];
        $allLocations = Location
            ::with([
                'city',
                'city.parent_city',
                'main_category',
                'restaurant_menu',
                'restaurant_menu.food_categories',
            ])
            ->get()
            ->keyBy('temp_old_id')
        ;
        $db = DB::connection('mysql2');
        $oldPostData = $db->table('wp_postmeta')
            ->select('wp_posts.*', 'wp_postmeta.meta_value')
            ->where('meta_key', 'jelovnik')
            ->whereIn('meta_value', $foodMenuIds)
            ->leftJoin('wp_posts', 'wp_postmeta.post_id', 'wp_posts.ID')
            ->get();
        $oldMenuData = $db->table('wp_posts')
            ->whereIn('ID', $foodMenuIds)
            ->get()
            ->keyBy('ID');
//        $this->output->writeln("Old locations: " . $oldPostData->count());
//        foreach ($oldPostData as $oldPost) {
//            $oldPostId = $oldPost->ID;
//            if (!isset($allLocations[$oldPostId])) {
//                $this->output->writeln("ERROR: $oldPostId, " . $foodMenuSlugs[$oldPost->meta_value]);
//                continue;
//            }
//            $locationData = $allLocations[$oldPostId];
//            $menuSlug = $foodMenuSlugs[$oldPost->meta_value];
//            $locationDataSlug = $locationData->slug;
//            $citySlug = $locationData->city->slug;
//            $categorySlug = $locationData->main_category->slug;
//            if ($locationData->city->parent_city) {
//                $citySlug = $locationData->city->parent_city->slug . '/' . $citySlug;
//            }
//            $this->output->writeln("$menuSlug => /$citySlug/$categorySlug/$locationDataSlug/jelovnik");
//        }
        foreach ($oldPostData as $oldPost) {
            $oldPostId = $oldPost->ID;
            if (!isset($allLocations[$oldPostId])) {
                $this->output->writeln("ERROR: $oldPostId, " . $foodMenuSlugs[$oldPost->meta_value]);
                continue;
            }
            $locationData = $allLocations[$oldPostId];
            if ($locationData->restaurant_menu->isEmpty() ||
                $locationData->restaurant_menu->first()->food_categories->isEmpty()
            ) {
                $menuData = $oldMenuData[$oldPost->meta_value];
                $menuSlug = $foodMenuSlugs[$oldPost->meta_value];
                $locationDataSlug = $locationData->slug;
                $citySlug = $locationData->city->slug;
                $categorySlug = $locationData->main_category->slug;
                if ($locationData->city->parent_city) {
                    $citySlug = $locationData->city->parent_city->slug . '/' . $citySlug;
                }
                if ($locationData->old_menu_data) {
//                    $this->output->writeln($locationData->old_menu_data);
                } else {
                    $this->output->writeln("$menuSlug => /$citySlug/$categorySlug/$locationDataSlug/jelovnik");
                    $this->output->writeln("-----------------------");
                    $this->output->writeln("-----------------------");
                }
            }
        }
    }

    public function locationWithoutCover()
    {
        $locations = Location::with('cover_image')->get();
        foreach ($locations as $location) {
            if (!$location->cover_image) {
                $this->output->writeln("Lokacija: $location->title");
            }
        }
    }

    /**
     * Get the console command arguments.
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['action', InputArgument::REQUIRED, 'Action name is required'],
            ['slug', InputArgument::OPTIONAL, 'Restaurant menu slug']
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
