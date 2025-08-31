<?php namespace Reuniors\Knk\Components;

use Cms\Classes\Controller;
use Reuniors\Comments\Components\Comments;
use Reuniors\Knk\Classes\Redirect404Exception;
use Reuniors\Knk\Http\Actions\V1\General\ProductionLoggingAction;
use Reuniors\Knk\Models\Location;
use Exception;
use Reuniors\Knk\Models\LocationRating;
use Reuniors\Knk\Models\LocationRatingHistory;
use Reuniors\Knk\Models\RegionCity;
use Auth;
use Response;
use Reuniors\Knk\Models\UserBadgeHistory;

class LocationComponent extends BaseKnkComponent
{
    public $location;
    public $locationCategorySlug;
    public $ratingTypes;
    public $validRatings;
    public $favoriteFoods;
    public $withoutImages = false;
    private $similarLocationsList;
    protected $propertyNameCategorySlug = 'categorySlug';
    protected $checkCanonical = true;


    public function componentDetails()
    {
        return [
            'name'        => 'Location Component',
            'description' => 'No description provided yet...'
        ];
    }

    public function defineProperties()
    {
        return [
            'citySlug' => [
                'title'       => 'City (slug)',
                'description' => 'City (slug)',
                'default'     => '{{ :citySlug }}',
                'type'        => 'string',
            ],
            'parentCitySlug' => [
                'title'       => 'Parent city (slug)',
                'description' => 'Parent city (slug)',
                'default'     => '{{ :parentCitySlug }}',
                'type'        => 'string',
            ],
            'municipalitySlug' => [
                'title'       => 'Municipality (slug)',
                'description' => 'Municipality (slug)',
                'default'     => '{{ :municipalitySlug }}',
                'type'        => 'string',
            ],
            'categorySlug' => [
                'title'       => 'Category (slug)',
                'description' => 'Category (slug)',
                'default'     => '{{ :categorySlug }}',
                'type'        => 'string',
            ],
            'slug' => [
                'title'       => 'Slug',
                'description' => 'Slug',
                'default'     => '{{ :slug }}',
                'type'        => 'string',
            ],
            'tab' => [
                'title'       => 'Tab',
                'description' => 'Tab',
                'default'     => '{{ :tab }}',
                'type'        => 'string',
            ],
            'isCanonical' => [
                'title'       => 'Is Canonical',
                'description' => 'Is Canonical',
                'default'     => '{{ :isCanonical }}',
                'type'        => 'checkbox',
            ],
            'withGallery' => [
                'title'       => 'With Gallery',
                'description' => 'With Gallery',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'withMenu' => [
                'title'       => 'With Menu',
                'description' => 'With redirect',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'withTags' => [
                'title'       => 'With Tags',
                'description' => 'With Tags',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'withCategories' => [
                'title'       => 'With Categories',
                'description' => 'With Categories',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'withRelatedLocations' => [
                'title'       => 'With Related Locations',
                'description' => 'With Related Locations',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'withBadges' => [
                'title'       => 'With Badges',
                'description' => 'With Related Locations',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'withUserId' => [
                'title'       => 'User logged in',
                'description' => 'User logged in',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'withLocationBadgesHistory' => [
                'title'       => 'With Location Badges',
                'description' => 'With Location Badges',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'withUserBadgesHistory' => [
                'title'       => 'With User Badges',
                'description' => 'With User Badges',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'withRatings' => [
                'title'       => 'With Related Locations',
                'description' => 'With Related Locations',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'withOtherInfo' => [
                'title'       => 'With Other Info',
                'description' => 'With Other Info',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'locationId' => [
                'title'       => 'LocationId (temp)',
                'description' => 'LocationId (temp)',
                'default'     => '{{ :locationId }}',
                'type'        => 'string',
            ],
        ];
    }

    public function onRunOriginal()
    {
        ProductionLoggingAction::run('before get location ', true);
        $locationId = $this->property('locationId');
        if ($locationId) {
            $this->location = $this->page['location'] = Location::findOrFail($locationId);
        } else {
            $this->location = $this->page['location'] = $this->getLocation();
            $this->locationCategorySlug = $this->page['locationCategorySlug'] = $this->property('categoriesSlug');
            if ($this->property('withRatings')) {
                $this->ratingTypes = $this->page['ratingTypes'] = LocationRating::$ratingTypes;
                $this->validRatings = $this->page['validRatings'] = LocationRating::$validRatings;
            }
        }
        if ($this->pageMeta && $this->location->cover_image) {
            $this->pageMeta->setOgImage($this->location->cover_image->path);
        }
        ProductionLoggingAction::run('after location ', true);
        if (ProductionLoggingAction::hasLogParam()) {
            $this->page['withoutImages'] = $this->withoutImages = true;
        }
    }

    public function getLocation()
    {
        $citySlug = $this->property('municipalitySlug');
        $citySlug = $citySlug ? $citySlug : $this->property('citySlug');
        $categorySlug = $this->property('categorySlug');
        $location = Location::getFE([
            'citySlug' => $citySlug,
            'categorySlug' => $categorySlug,
            'slug' => $this->property('slug'),
            'withGallery' => $this->property('withGallery'),
            'withMenu' => $this->property('withMenu'),
            'withTags' => $this->property('withTags'),
            'withCategories' => $this->property('withCategories'),
            'withRelatedLocations' => $this->property('withRelatedLocations'),
            'withBadges' => $this->property('withBadges'),
            'withRatings' => $this->property('withRatings'),
            'withFoodLikes' => $this->property('withFoodLikes'),
            'withUserId' => $this->property('withUserId'),
            'withOtherInfo' => $this->property('withOtherInfo'),
            'withWorkingTime' => $this->property('withWorkingTime', true),
        ])->first();
        if (empty($location)) {
            throw new Redirect404Exception();
        }
        $location->loadFERelations([
            'withUserId' => $this->property('withUserId'),
            'withLocationBadgesHistory' => $this->property('withLocationBadgesHistory'),
            'withUserBadgesHistory' => $this->property('withUserBadgesHistory'),
        ]);
        if (isset($location->restaurant_menu) && !$location->restaurant_menu->isEmpty()) {
            $location->foodMenu = $location->restaurant_menu
                ->sortBy([
                    ['relations_updated_at', 'desc'],
                    ['id', 'asc'],
                ])
                ->first();
        }
        $this->checkAndUpdateCanonicalLink($location);
        return $location;
    }

    protected function checkAndUpdateCanonicalLink($location)
    {
        $categorySlug = $this->property('categorySlug');
        if (isset($location->first_category) && $location->first_category->slug !== $categorySlug) {
            $controller = $this->controller;
            $cmsController = new Controller();
            if (self::$addedCanonicalHeader && isset(self::$addedCanonicalHeader['overridden'])) {
                return null;
            }
            $properties = $this->properties;
            $hasTab = isset($properties['tab']) && !empty($properties['tab']);
            $tabPage = 'location/p40-one-location-tab';
            if (self::$addedCanonicalHeader) {
                $properties = self::$addedCanonicalHeader['properties'];
                $pageFileName = self::$addedCanonicalHeader['pageFileName'];
            } elseif (isset($properties['municipalitySlug'])) {
                if ($hasTab) {
                    $pageFileName = RegionCity::$linkMunicipalityPages[$tabPage];
                } else {
                    $pageFileName = $controller->getPage()->getBaseFileName();
                    $pageFileName = RegionCity::$linkMunicipalityPages[$pageFileName];
                }
            } else {
                if ($hasTab) {
                    $pageFileName = $tabPage;
                } else {
                    $pageFileName = $controller->getPage()->getBaseFileName();
                }
            }
            $properties['categorySlug'] = $location->first_category->slug;
            $canonicalUrl = $cmsController->pageUrl($pageFileName, $properties);
            header("Link: <$canonicalUrl>; rel=\"canonical\"");
            self::$addedCanonicalHeader = [
                'pageFileName' => $pageFileName,
                'properties' => $properties,
                'overridden' => true,
            ];
        }
    }

    public function setRating($locationId, $ratingType, $ratingGrade, $userId)
    {
        static $ratings = [];
        static $locations = [];
        if (isset($locations[$locationId])) {
            $locationData = $locations[$locationId];
        } else {
            $locationData = Location::where('id', $locationId)
                ->firstOrFail();
        }
        $locationRatingCount = $locationData->rating_count;
        $locationRatingGrade = $locationData->rating_average_grade;
        if (isset($ratings[$locationId][$ratingType])) {
            $rating =  $ratings[$locationId][$ratingType];
        } else {
            $rating = LocationRating::where('location_id', $locationId)
                ->where('rating_type', $ratingType)
                ->first();
        }
        if ($rating === null) {

            $rating = new LocationRating();
            $rating->location_id = $locationId;
            $rating->rating_type = $ratingType;
            $rating->grade = $ratingGrade;
            $rating->save();
            $ratings[$locationId] = isset($ratings[$locationId]) ? $ratings[$locationId] : [];
            $ratings[$locationId][$ratingType] = $rating;

            $ratingHistory = new LocationRatingHistory();
            $ratingHistory->location_id = $locationId;
            $ratingHistory->location_rating_id = $rating->id;
            $ratingHistory->user_id = $userId;
            $ratingHistory->grade = $ratingGrade;
            $ratingHistory->save();

            $locationData->rating_average_grade = ($locationRatingGrade * $locationRatingCount  + $ratingGrade)
                / ($locationRatingCount + 1);
            $locationData->rating_count += 1;

        } else {
            $oldGrade = $rating->grade;
            $oldCounter = $rating->counter;
            $ratingHistory = LocationRatingHistory::where('user_id', $userId)
                ->where('location_id', $locationId)
                ->where('location_rating_id', $rating->id)
                ->first();
            if ($ratingHistory === null) {
                $ratingHistory = new LocationRatingHistory();
                $ratingHistory->location_id = $locationId;
                $ratingHistory->location_rating_id = $rating->id;
                $ratingHistory->user_id = $userId;
                $ratingHistory->grade = $ratingGrade;
                $ratingHistory->save();
                $locationData->rating_count += 1;
            } else {
                $locationRatingCount -= 1;
                $locationRatingGrade = $locationRatingCount > 0
                    ? ($locationRatingGrade * ($locationRatingCount + 1) - $ratingHistory->grade)
                    / $locationRatingCount
                    : 0;
                $oldCounter -= 1;
                $oldGrade =  $oldCounter > 0
                    ? ($oldGrade * ($oldCounter + 1) - $ratingHistory->grade) / $oldCounter
                    : 0;
                $ratingHistory->grade = $ratingGrade;
                $ratingHistory->save();
            }
            $rating->grade = ($oldGrade * $oldCounter + $ratingGrade) / ($oldCounter + 1);
            $rating->counter = $oldCounter + 1;
//            $rating->save();

            $locationData->rating_average_grade = ($locationRatingGrade * $locationRatingCount  + $ratingGrade)
                / ($locationRatingCount + 1);
        }
//        $locationData->save();
    }

    public function removeRating($locationId, $ratingType, $ratingGrade, $userId)
    {
        static $ratings = [];
        static $locations = [];
        if (isset($locations[$locationId])) {
            $locationData = $locations[$locationId];
        } else {
            $locationData = Location::where('id', $locationId)
                ->firstOrFail();
        }
        $locationRatingCount = $locationData->rating_count;
        $locationRatingGrade = $locationData->rating_average_grade;
        if (isset($ratings[$locationId][$ratingType])) {
            $rating =  $ratings[$locationId][$ratingType];
        } else {
            $rating = LocationRating::where('location_id', $locationId)
                ->where('rating_type', $ratingType)
                ->first();
        }
        if ($rating === null) {
            return null;
        }
        $oldGrade = $rating->grade;
        $oldCounter = $rating->counter;
        $ratingHistory = LocationRatingHistory::where('user_id', $userId)
            ->where('location_id', $locationId)
            ->where('location_rating_id', $rating->id)
            ->first();
        if ($ratingHistory === null) {
            return null;
        }
        $locationRatingCount -= 1;
        $locationRatingGrade = $locationRatingCount > 0
            ? ($locationRatingGrade * ($locationRatingCount + 1) - $ratingHistory->grade)
            / $locationRatingCount
            : 0;
        $oldCounter -= 1;
        $oldGrade =  $oldCounter > 0
            ? ($oldGrade * ($oldCounter + 1) - $ratingHistory->grade) / $oldCounter
            : 0;
        $ratingHistory->delete();
        if ($oldCounter) {
            $rating->grade = $oldGrade;
            $rating->counter = $oldCounter;
            $rating->save();
        } else {
            $rating->delete();
        }

        $locationData->rating_count -= 1;
        $locationData->rating_average_grade = $locationRatingGrade;
        $locationData->save();
    }

    public function onRating()
    {
        if (!Auth::check()) {
            return Response::make('Forbidden', 403);
        }
        $user = Auth::getUser();
        $locationId = post('location_id');
        $ratingType = post('type');
        $ratingGrade = post('rating_' . $ratingType);
        if ($ratingGrade) {
            $this->setRating($locationId, $ratingType, $ratingGrade, $user->id);
        } else {
            $this->removeRating($locationId, $ratingType, $ratingGrade, $user->id);
        }
    }

    public function onAdvancedRating()
    {
        if (!Auth::check()) {
            return Response::make('Forbidden', 403);
        }
        $user = Auth::getUser();
        $locationId = post('location_id');
        foreach (LocationRating::$ratingTypes as $ratingType => $ratingTypeData) {
            $ratingGrade = post('rating_' . $ratingType);
            if ($ratingGrade) {
                $this->setRating($locationId, $ratingType, $ratingGrade + 4, $user->id);
            }
        }
        $commentContent = post('content');
        $commentPostId = post('post_id');
        $commentComponent = new Comments($this->page);
        $commentComponent->init();
        $this->onBadge();
        return $commentComponent->saveCommentWithRating();
    }

    public function onBadge()
    {
        if (!Auth::check()) {
            return Response::make('Forbidden', 403);
        }
        $user = Auth::getUser();
        $locationId = post('location_id');
        $badges = post('badges');
        UserBadgeHistory::updateBadges($locationId, $user->id, $badges ?? []);
    }

    public function similarLocations()
    {
        if (!$this->similarLocationsList) {
            $similarLocationsList = Location::getSimilarList([
                'location' => $this->location,
            ]);
            if ($similarLocationsList) {
                $this->similarLocationsList = $this->page['similarLocationsList'] = $similarLocationsList->get();
            }
        }
        return $this->similarLocationsList;
    }

    public function onTabInfo()
    {
        $this->addUser();
        $this->onRunOriginal();
    }

    public function onTabMenu()
    {
        $this->addUser();
        $this->onRunOriginal();
    }

    public function onTabGallery()
    {
        $this->addUser();
        $this->onRunOriginal();
    }

    public function onTabReview()
    {
        $this->addUser();
        $this->onRunOriginal();
    }

    protected function addUser()
    {
        $user = Auth::check() ? Auth::getUser() : null;
        if ($user) {
            $this->page['user'] = $user;
        }
    }
}
