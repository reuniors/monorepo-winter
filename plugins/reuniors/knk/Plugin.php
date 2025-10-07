<?php namespace Reuniors\Knk;

use App;
use Cms\Classes\Controller;
use Illuminate\Contracts\Debug\ExceptionHandler;
use Illuminate\Foundation\AliasLoader;
use Laravel\Sanctum\SanctumServiceProvider;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\SocialiteServiceProvider;
use Lorisleiva\Actions\ActionServiceProvider;
use RainLab\User\Controllers\Users as UsersController;
use RainLab\User\Models\User as UserModel;
use Reuniors\Base\Classes\CustomHandler;
use Reuniors\Knk\Classes\SitemapDefinition;
use Reuniors\Knk\Http\Actions\V1\Image\ImagesWebpConvertAction;
use System\Classes\ImageResizer;
use System\Classes\PluginBase;
use Event;
use Vdlp\Sitemap\Classes\SitemapGenerator;
use Auth;
use Log;

class Plugin extends PluginBase
{
    public $require = ['Winter.User', 'Reuniors.Base'];

    public function registerComponents()
    {
        return [
            'Reuniors\Knk\Components\BannerComponent' => 'banner',
            'Reuniors\Knk\Components\CategoriesComponent' => 'categories',
            'Reuniors\Knk\Components\CategoryComponent' => 'category',
            'Reuniors\Knk\Components\CitiesComponent' => 'cities',
            'Reuniors\Knk\Components\LocationsComponent' => 'locations',
            'Reuniors\Knk\Components\LocationComponent' => 'location',
            'Reuniors\Knk\Components\TagGroupsComponent' => 'tagGroups',
            'Reuniors\Knk\Components\TagsComponent' => 'tags',
            'Reuniors\Knk\Components\FoodMenuComponent' => 'foodMenu',
        ];
    }

    public function registerSettings()
    {
    }

    public function register()
    {
        $alias = AliasLoader::getInstance();
        $alias->alias('Globals', 'Reuniors\Knk\Facades\Globals');
        App::singleton('knk.global', function() {
            return \Reuniors\Knk\Classes\KNKGlobals::instance();
        });
        $this->registerConsoleCommand('reuniors.migrateKnk', 'Reuniors\Knk\Console\MigrateKnk');
        $this->registerConsoleCommand('reuniors.updatemigrations', 'Reuniors\Knk\Console\UpdateMigrations');
        $this->registerConsoleCommand('reuniors.datafixes', 'Reuniors\Knk\Console\DataFixes');


        $this->app->register(SanctumServiceProvider::class);
        $this->app->register(ActionServiceProvider::class);
        $this->app->register(SocialiteServiceProvider::class);
        $this->app->alias('Socialite', Socialite::class);
    }

    public function registerMarkupTags()
    {
        return [
            'filters' => [
                'imageWidthE' => [$this, 'calcImageWidth'],
                'imageHeightE' => [$this, 'calcImageHeight'],
            ],
            'functions' => [
                'locationUrl' => [$this, 'makeLocationUrl'],
                'locationCategoryUrl' => [$this, 'makeLocationCategoryUrl'],
                'userHasGroup' => [$this, 'makeCheckUserHasGroup'],
                'getEnv' => [$this, 'makeGetEnv'],
            ]
        ];
    }

    public function calcImageWidth($image)
    {
        try {
            return @ImageResizer::filterGetDimensions($image)['width'];
        } catch (\Exception $e) {
            return 0;
        }
    }

    public function calcImageHeight($image)
    {
        try {
            return @ImageResizer::filterGetDimensions($image)['height'];
        } catch (\Exception $e) {
            return 0;
        }
    }

    public function makeLocationUrl($location, $city, $categorySlug = null)
    {
        $controller = Controller::getController();
        $category = $location->getFirstCategory($categorySlug);
        $locationCity = $location->city->slug;
        $city = $city ? $city : $locationCity;
        if ($locationCity != $city) {
            $pageParams = [
                'citySlug' => $city,
                'municipalitySlug' => $locationCity,
                'slug' => $location->slug
            ];
            if ($category) {
                $pageParams['categorySlug'] = $category->slug;
            }
            return $controller->pageUrl('location/p30-municipality-one-location', $pageParams);
        } else {
            $pageParams = [
                'slug' => $location->slug,
                'citySlug' => $city
            ];
            if ($category) {
                $pageParams['categorySlug'] = $category->slug;
            }
            return $controller->pageUrl('location/p50-one-location', $pageParams);
        }
    }

    public function makeLocationCategoryUrl($location, $city)
    {
        $controller = Controller::getController();
        $category = $location->getFirstCategory();
        $locationCity = $location->city->slug;
        $city = $city ? $city : $locationCity;
        if ($locationCity != $city) {
            $pageParams = [
                'citySlug' => $city,
                'municipalitySlug' => $locationCity,
                'categorySlug' => $category->slug
            ];
            return $controller->pageUrl('location/p10-locations-municipality', $pageParams);
        } else {
            $pageParams = [
                'citySlug' => $city,
                'categorySlug' => $category->slug,
            ];
            return $controller->pageUrl('location/p20-locations-list', $pageParams);
        }
    }

    public function makeCheckUserHasGroup($groupName)
    {
        if (!$groupName || !Auth::check()) {
            return false;
        }

        $user = Auth::getUser();
        if ($user) {
            $userGroup = $user->groups()->where('code', $groupName)->first();
            if ($userGroup) {
                return true;
            }
        }
        return false;
    }

    public function makeGetEnv($name)
    {
        return env($name);
    }
//
//    public function boot()
//    {
//        Event::listen('cms.page.beforeDisplay', function ($controller, $url, $page) {
//            $router = $controller->getRouter();
//            $routerParams = $router->getParameters();
//            if (isset($routerParams['citySlug'])) {
//                $citySlug = $routerParams['citySlug'];
//                $citySlugExploded = explode('/', $citySlug);
//                $routerParams['citySlug'] = isset($citySlugExploded[1]) ? $citySlugExploded[1] : $citySlugExploded[0];
//                $router->setParameters($routerParams);
//            }
//        });
//    }
    public function boot()
    {
        parent::boot();
        /* Replace the default error handler of OctoberCMS to return JSON format responses instead. */
        /* Also, this is used in order to control the responses for certain types of errors/exceptions. */
        /* We are going about it this way because App::error (as mentioned in the documentation for OctoberCMS), */
        /* was not returning the response properly presumably because of a bug. Argh... */
        $this->app->bind(
            ExceptionHandler::class,
            \Reuniors\Base\Classes\CustomHandler::class
        );
        UserModel::extend(function(UserModel $model) {
            $model->belongsTo['city'] = ['\Reuniors\Knk\Models\RegionCity'];
            $model->hasMany['user_badge_history'] = [
                'Reuniors\Knk\Models\UserBadgeHistory',
                'key' => 'user_id'
            ];
            $model->hasMany['working_time_history'] = [
                'Reuniors\Knk\Models\UserWorkingTimeHistory',
                'key' => 'user_id'
            ];
            $model->hasOne['location_rating_history'] = [
                'Reuniors\Knk\Models\LocationRatingHistory',
                'key' => 'user_id'
            ];
            $model->addFillable([
                'city_id'
            ]);
        });

        UsersController::extendFormFields(function($form, $model, $context) {

            if(!$model instanceof UserModel)
                return;

            if(!$model->exists)
                return;

            $form->addTabFields([
                'city' => [
                    'label' => 'City',
                    'type'  => 'relation',
                    'tab' => 'City',
                ],
            ]);
        });

        Event::listen(SitemapGenerator::GENERATE_EVENT, static function(): array {
            return [
                new SitemapDefinition()
            ];
        });

        Event::listen('cms.page.display', function ($controller) {
            $controller->setResponseHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            $controller->setResponseHeader('Pragma', 'no-cache');
            $controller->setResponseHeader('Expires', '0');
        });
    }

    public function registerNodes(): array
    {
        return [
//            'category' => [
//                'controller' => 'Reuniors\Knk\Http\Controllers\Api\V1\CategoriesApiController',
//                'only'       => ['index', 'create', 'show', 'store']
//            ],
//            'location' => [
//                'controller' => 'Reuniors\Knk\Http\Controllers\Api\V1\LocationsApiController',
//                'only'       => ['index', 'create', 'show', 'store']
//            ],
            'tag-group' => [
                'controller' => 'Reuniors\Knk\Http\Controllers\Api\V1\TagGroupsApiController',
                'only'       => ['index', 'create', 'show', 'store']
            ],
            'tag' => [
                'controller' => 'Reuniors\Knk\Http\Controllers\Api\V1\TagsApiController',
                'only'       => ['index', 'create', 'show', 'store']
            ],
            'restaurant-menu' => [
                'controller' => 'Reuniors\Knk\Http\Controllers\Api\V1\RestaurantMenuApiController',
                'only'       => ['index', 'create', 'show', 'store']
            ],
            'food-category' => [
                'controller' => 'Reuniors\Knk\Http\Controllers\Api\V1\FoodCategoriesApiController',
                'only'       => ['index', 'create', 'show', 'store']
            ],
            'food' => [
                'controller' => 'Reuniors\Knk\Http\Controllers\Api\V1\FoodsApiController',
                'only'       => ['index', 'create', 'show', 'store']
            ],
            'food-addon-group' => [
                'controller' => 'Reuniors\Knk\Http\Controllers\Api\V1\FoodAddonGroupsApiController',
                'only'       => ['index', 'create', 'show', 'store']
            ],
            'food-addon' => [
                'controller' => 'Reuniors\Knk\Http\Controllers\Api\V1\FoodAddonsApiController',
                'only'       => ['index', 'create', 'show', 'store']
            ],
        ];
    }

    public function registerSchedule($schedule)
    {
        $schedule->job(ImagesWebpConvertAction::class)
            ->name('Convert all images to webp')
            ->hourly()
            ->withoutOverlapping();
    }
}
