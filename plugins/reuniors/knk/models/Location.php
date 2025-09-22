<?php
namespace Reuniors\Knk\Models;

use Cms\Classes\Controller;
use Illuminate\Support\Collection;
use October\Rain\Database\Traits\SoftDelete;
use October\Rain\Database\Traits\Sortable;
use October\Rain\Database\Traits\Validation;
use Reuniors\Comments\Models\Comments;
use Reuniors\Knk\Models\RegionCity;
use Reuniors\Knk\Facades\Globals;
use Reuniors\Base\Models\Tag;
use Reuniors\Base\Models\TagGroup;
use Reuniors\Knk\Models\FileImage\FileImageSquare;
use Reuniors\Knk\Models\FileImage\FileImageWide;
use Winter\Storm\Exception\ValidationException;
use Winter\User\Models\User;
use Auth;
use BadMethodCallException;

/**
 * Model
 */
class Location extends MariaDbBase
{
    use Validation;
    use SoftDelete;
    use Sortable;

    const SORT_ORDER = 'sort_order';
    const START_TIME = 'start';
    const LABEL_SHORT = 'labelShort';
    const LABEL_SHORT_2 = 'labelShort2';
    const END_TIME = 'end';
    const FROM_DAY = 'from_day';
    const TO_DAY = 'to_day';

    protected $dates = ['deleted_at'];

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel'];

    public $translatable = [
        'title',
        'snippet',
        'text',
        'description',
        ['slug', 'index' => true]
    ];

    protected $fillable = [
        'title',
        'name',
        'slug',
        'text',
        'activation_at',
        'deactivation_at',
        'metadata',
        'snippet',
        'city_id',
        'is_child',
        'parent_id',
        'address_data',
        'phone_data',
        'working_hours_data',
        'delivery_working_hours_data',
        'other_info',
        'show_on_home',
        'show_on_home_global',
        'has_delivery',
        'has_online_delivery',
        'average_price',
        'average_price_for_two',
        'delivery_url_path',
        'badge_tag_group_id',
        'address_lat',
        'address_long',
        'closed_from_at',
        'closed_to_at',
        'is_closed',
        'active',
        'main_category_id',
        'user_id',
        'rzr_id',
        'likes_count',
        'comments_count',
        'gov_support',
        'rating_average_grade'
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_locations';

    const RULES = [
        'title' => 'string|max:255',
        'name' => 'string|max:255',
        'slug' => 'string|max:255',
        'text' => 'string|max:25555',
        'activation_at' => 'date|nullable',
        'deactivation_at' => 'date|nullable',
        'metadata' => 'array|nullable',
        'snippet' => 'string|max:1000',
        'city_id' => 'integer|nullable',
        'is_child' => 'integer|nullable',
        'parent_id' => 'integer|nullable',
        'address_data' => 'array',
        'phone_data' => 'array',
        'other_info' => 'array|nullable',
        'show_on_home' => 'boolean',
        'show_on_home_global' => 'boolean',
        'has_delivery' => 'boolean',
        'has_online_delivery' => 'boolean',
        'average_price' => 'numeric|nullable',
        'average_price_for_two' => 'numeric|nullable',
        'delivery_url_path' => 'string|max:1000|nullable',
        'badge_tag_group_id' => 'integer|nullable',
        'address_lat' => 'numeric|nullable',
        'address_long' => 'numeric|nullable',
        'closed_from_at' => 'date|nullable',
        'closed_to_at' => 'date|nullable',
        'is_closed' => 'boolean',
        'main_category_id' => 'numeric',
    ];

    const FE_SELECT = [
        'id',
        'city_id',
        'main_category_id',
        'title',
        'slug',
        'active',
        'snippet',
        'likes_count',
        'comments_count',
        'rating_average_grade',
        'address_lat',
        'address_long',
        'is_closed',
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [
        ...self::RULES,
        'title' => 'required|max:255',
        //        'name' => 'required|unique:reuniors_knk_locations,name,NULL,id,deleted_at,NULL|max:255',
        //        'slug' => 'required|unique:reuniors_knk_locations,name,NULL,id,deleted_at,NULL|max:255',
        'main_category_id' => 'required',
    ];

    /**
     * @var array Json properties
     */
    protected $jsonable = [
        'address_data', 'phone_data',
        'working_hours_data', 'delivery_working_hours_data',
        'metadata', 'other_info'
    ];

    public $attachOne = [
        'cover_image' => [FileImageWide::class, 'order' => 'sort_order', 'delete' => true],
        'logo' => [FileImageSquare::class, 'order' => 'sort_order', 'delete' => true],
    ];

    public static array $limits = [
        'gallery' => 15,
        'menu_gallery' => 10,
    ];

    public $attachMany = [
        'gallery' => [FileImageSquare::class, 'order' => 'sort_order', 'delete' => true],
        'menu_gallery' => [FileImageSquare::class, 'order' => 'sort_order', 'delete' => true],
    ];

    public $belongsToMany = [
        'categories' => [
            Category::class,
            'table' => 'reuniors_knk_locations_categories',
            'order' => 'name',
        ],
        'restaurant_menu' => [
            RestaurantMenu::class,
            'table' => 'reuniors_knk_locations_restaurant_menu',
            'order' => 'name',
        ],
        'foods' => [
            Food::class,
            'table' => 'reuniors_knk_locations_foods',
            'order' => 'sort_order',
        ],
        'food_categories' => [
            FoodCategory::class,
            'table' => 'reuniors_knk_locations_food_categories',
            'order' => 'sort_order',
        ],
        'tags' => [
            Tag::class,
            'table' => 'reuniors_knk_locations_tags',
            'order' => 'name',
        ],
        'related_locations' => [
            Location::class,
            'table' => 'reuniors_knk_location_related_locations',
            'order' => 'name',
            'key' => 'location_id',
            'otherKey' => 'location_related_id'
        ],
        'related_locations_of' => [
            Location::class,
            'table' => 'reuniors_knk_location_related_locations',
            'order' => 'name',
            'key' => 'location_related_id',
            'otherKey' => 'location_id'
        ],
        'banners' => [
            Banner::class,
            'table' => 'reuniors_knk_banners_locations',
            'order' => 'name',
        ],
        'working_time' => [
            WorkingTime::class,
            'table' => 'reuniors_knk_locations_working_hours',
            'key' => 'location_id',
            'otherKey' => 'working_hours_id',
            'conditions' => "type = 'working_time'"
        ],
        'delivery_working_time' => [
            WorkingTime::class,
            'table' => 'reuniors_knk_locations_working_hours',
            'key' => 'location_id',
            'otherKey' => 'working_hours_id',
            'conditions' => "type = 'delivery_working_time'"
        ]
    ];

    public $belongsTo = [
        'city' => [RegionCity::class, 'order' => 'name'],
        'parent' => [Location::class, 'order' => 'name'],
        'badge_tag_group' => [
            TagGroup::class,
            'order' => 'name',
            'conditions' => "type = 'badge'",
        ],
        'main_category' => [Category::class, 'order' => 'name'],
        'owner' => [User::class, 'order' => 'name'],
    ];

    public $hasMany = [
        'location_ratings' => [LocationRating::class, 'key' => 'location_id'],
        'other_informations' => [LocationOtherInformation::class, 'key' => 'location_id'],
        'location_badge_history' => [LocationBadgeHistory::class, 'key' => 'location_id'],
        'change_actions' => [Action::class, 'key' => 'location_id'],
        'likes_history' => [LocationLikesHistory::class, 'key' => 'location_id'],
        'video_reviews' => [LocationVideoReview::class, 'key' => 'location_id'],
        'comments' => [Comments::class, 'key' => 'attachment_id', 'conditions' => 'attachment_field = "location"'],
    ];

    public static $tabs = [
        'jelovnik' => 'menu',
        'info' => 'info',
        'utisci' => 'review',
        'galerija' => 'gallery',
        'Jelovnik' => 'menu',
    ];

    protected $dayMapper = [
        'monday_friday' => [
            self::LABEL_SHORT => null
        ],
        'monday' => [
            self::LABEL_SHORT => 'Pon'
        ],
        'tuesday' => [
            self::LABEL_SHORT => 'Uto'
        ],
        'wednesday' => [
            self::LABEL_SHORT => 'Sre'
        ],
        'thursday' => [
            self::LABEL_SHORT => 'Čet'
        ],
        'friday' => [
            self::LABEL_SHORT => 'Pet'
        ],
        'saturday' => [
            self::LABEL_SHORT => 'Sub'
        ],
        'sunday' => [
            self::LABEL_SHORT => 'Ned'
        ],
    ];

    protected $appends = [
        'working_hours',
        'delivery_working_hours',
        'first_category',
        'url',
        'rating_by_type',
        'cuisines',
        'rating_rounded_five',
        'is_new',
        'phone_numbers',
        'delivery_phone_numbers',
    ];

    protected static $controller = null;

    public static $availableSort = [
        'name' => 'title',
        'rating' => 'rating_average_grade',
        'new' => 'created_at',
        'price_for_two' => 'average_price_for_two',
        'distance' => ''
    ];

    public static $availableOrientation = ['asc', 'desc'];

    public $savedFirstCategory = null;

    public $tagsCuisines = [];

    public static $overrideCitySlug = null;

    public function getUrlAttribute()
    {
        if (empty($this->controller) && empty(self::$controller)) {
            self::$controller = new Controller;
        }
        $citySlug = self::$overrideCitySlug;
        if ($this->relationLoaded('city') &&
                !empty($this->first_category) &&
                !empty($this->slug)) {
            $citySlug = $citySlug ?? $this->city->slug;
            $pageFileName = 'location/p50-one-location';
            $pageParams = [
                'citySlug' => $citySlug ?? $this->city->slug,
                'categorySlug' => $this->main_category->slug,
                'slug' => $this->slug
            ];
            if (!($citySlug === $this->city->slug) &&
                    $this->city->relationLoaded('parent_city') &&
                    $this->city->parent_city) {
                $pageParams['citySlug'] = $this->city->parent_city->slug;
                $pageParams['municipalitySlug'] = $this->city->slug;
                $pageFileName = 'location/p30-municipality-one-location';
            }
            return self::$controller->pageUrl($pageFileName, $pageParams);
        }
        return null;
    }

    public function getWorkingHours($workingHoursAttrName)
    {
        $returnWorkHours = [];
        $dayMapper = $this->dayMapper;
        if (isset($this->{$workingHoursAttrName})) {
            $workingHoursData = $this->{$workingHoursAttrName};
            foreach ($dayMapper as $workingDay => $workingDayData) {
                if (isset($workingHoursData[$workingDay])) {
                    $workingHoursDayData = $workingHoursData[$workingDay];
                    if ($workingHoursDayData[self::START_TIME]) {
                        if ($workingDay == 'monday_friday') {
                            $returnWorkHours[$workingDay] = [
                                self::START_TIME => date(
                                    'H:i',
                                    strtotime($workingHoursDayData[self::START_TIME])
                                ),
                                self::END_TIME => date(
                                    'H:i',
                                    strtotime($workingHoursDayData[self::END_TIME])
                                ),
                                self::LABEL_SHORT =>
                                    $dayMapper[$workingHoursData[self::FROM_DAY]][self::LABEL_SHORT],
                                self::LABEL_SHORT_2 =>
                                    $dayMapper[$workingHoursData[self::TO_DAY]][self::LABEL_SHORT]
                            ];
                        } else {
                            $returnWorkHours[$workingDay] = [
                                self::START_TIME => date(
                                    'H:i',
                                    strtotime($workingHoursDayData[self::START_TIME])
                                ),
                                self::END_TIME => date(
                                    'H:i',
                                    strtotime($workingHoursDayData[self::END_TIME])
                                ),
                                self::LABEL_SHORT => $workingDayData[self::LABEL_SHORT]
                            ];
                        }
                    }
                }
            }
        }
        return $returnWorkHours;
    }

    public function getWorkingHoursAttribute()
    {
        return $this->getWorkingHours('working_hours_data');
    }

    public function getDeliveryWorkingHoursAttribute()
    {
        return $this->getWorkingHours('delivery_working_hours_data');
    }

    public function getFirstCategoryAttribute()
    {
        return $this->getFirstCategory();
    }

    public function getCuisinesAttribute()
    {
        if (empty($this->tagsCuisines) && $this->relationLoaded('tags')) {
            foreach ($this->tags as $tag) {
                if (isset($tag->tag_group) && $tag->tag_group->name === 'kuhinja') {
                    $this->tagsCuisines[] = $tag;
                }
            }
        }
        return $this->tagsCuisines;
    }

    public function getRatingRoundedFiveAttribute()
    {
        return isset($this->rating_average_grade)
            ? round($this->rating_average_grade * 10 / 5) * 5
            : null;
    }

    public function getIsNewAttribute()
    {
        return $this->activation_at;
    }

    public function getRatingByTypeAttribute()
    {
        if ($this->relationLoaded('location_ratings') && !empty($this->location_ratings)) {
            return $this->location_ratings->keyBy('rating_type');
        }
        return null;
    }

    public function getRatingChartAttribute()
    {
        $returnData = [
            'labels' => [],
            'data' => [],
            'backgroundColor' => []
        ];
        $ratingsByTypes = $this->getRatingByTypeAttribute();
        foreach (LocationRating::$ratingTypes as $ratingTypeKey => $ratingType) {
            if ($ratingTypeKey === 'general') {
                continue;
            }
            $returnData['labels'][] = $ratingType['label'];
            $returnData['backgroundColor'][] = $ratingType['backgroundColor'];
            $returnData['data'][] = isset($ratingsByTypes[$ratingTypeKey])
                ? round($ratingsByTypes[$ratingTypeKey]['grade'], 2)
                : 0;
        }
        return $returnData;
    }

    public function getPhoneNumbersAttribute()
    {
        if (isset($this->phone_data['phone_numbers'])) {
            return $this->phone_data['phone_numbers'];
        }

        $phoneNumbers = [];
        $phoneNumbers[] = $this->phone_data['phone_1'] ?? null;
        $phoneNumbers[] = $this->phone_data['phone_2'] ?? null;
        $phoneNumbers[] = $this->phone_data['mobile_1'] ?? null;
        $phoneNumbers[] = $this->phone_data['mobile_2'] ?? null;

        return array_filter($phoneNumbers);
    }

    public function getDeliveryPhoneNumbersAttribute()
    {
        if (isset($this->phone_data['delivery_phone_numbers'])) {
            return $this->phone_data['delivery_phone_numbers'];
        }

        $phoneNumbers = [];
        $phoneNumbers[] = $this->phone_data['delivery_1'] ?? null;
        $phoneNumbers[] = $this->phone_data['delivery_2'] ?? null;

        return array_filter($phoneNumbers);
    }

    public function getFirstCategory($categorySlug = null, $reset = false)
    {
        $category = $reset ? null : $this->savedFirstCategory;
        $categories = $this->relationLoaded('categories') && $this->categories->isNotEmpty()
            ? $this->categories
            : null;
        $mainCategory = $this->relationLoaded('main_category') && !empty($this->main_category)
            ? $this->main_category
            : null;
        if (empty($category) && ($categories || $mainCategory)) {
            if (isset($categorySlug) && $categories) {
                $category = $this->categories->firstWhere('slug', $categorySlug);
            } elseif ($mainCategory) {
                $category = $this->main_category;
            } elseif ($this->main_category_id) {
                $category = $categories->firstWhere('id', $this->main_category_id);
            }
            $category = $category ?? $categories->first();
        }
        $this->savedFirstCategory = $category;
        return $category;
    }

    public function getOtherTypeOptions()
    {
        return [
            'Website',
            'Delivery time'
        ];
    }

    public function getFavoriteFoodsAttribute()
    {
        $foodTable = (new Food)->getTable();
        $restaurantMenuCategories = 'reuniors_knk_restaurant_menu_food_categories';
        $restaurantMenu = 'reuniors_knk_restaurant_menu';
        $locationRestaurantMenu = 'reuniors_knk_locations_restaurant_menu';
        $favoriteFoods = Food::select("$foodTable.*")
            ->join(
                $restaurantMenuCategories,
                "$restaurantMenuCategories.food_category_id",
                '=',
                "$foodTable.food_category_id"
            )
            ->join(
                $restaurantMenu,
                "$restaurantMenu.id",
                '=',
                "$restaurantMenuCategories.restaurant_menu_id"
            )
            ->join(
                $locationRestaurantMenu,
                "$locationRestaurantMenu.restaurant_menu_id",
                '=',
                "$restaurantMenu.id"
            )
            ->where("$locationRestaurantMenu.location_id", $this->id)
            ->take(3)
            ->orderByDesc('number_of_likes')
            ->with('food_image')
            ->get();
        return $favoriteFoods;
    }

    public function scopeGetFE($query, $options)
    {
        /**
         * Default options
         * @var $slug
         * @var $citySlug
         * @var $categorySlug
         * @var $active
         * @var $limit
         * @var $offset
         * @var $withGallery
         * @var $withMenu
         * @var $withTags
         * @var $withCategories
         * @var $withMainCategory
         * @var $withRelatedLocations
         * @var $withBadges
         * @var $withRatings
         * @var $withFoodLikes
         * @var $withUserId
         * @var $withOtherInfo
         * @var $withWorkingTime
         */
        extract(array_merge([
            'slug' => null,
            'citySlug' => null,
            'categorySlug' => null,
            'active' => null,
            'withGallery' => null,
            'withMenu' => null,
            'withTags' => null,
            'withCategories' => null,
            'withMainCategory' => null,
            'withRelatedLocations' => false,
            'withBadges' => false,
            'withRatings' => false,
            'withFoodLikes' => false,
            'withUserId' => false,
            'withOtherInfo' => false,
            'withWorkingTime' => false,
        ], $options));
        $user = Auth::check() ? Auth::getUser() : null;

        if (!empty($citySlug)) {
            $query->whereHas('city', function ($cityQuery) use ($citySlug) {
                $cityQuery
                    ->where('slug', $citySlug)
                    ->orWhereHas('parent_city', function ($childCitiesQuery) use ($citySlug) {
                        $childCitiesQuery->where('slug', $citySlug);
                    });
            });
        }
        if ($categorySlug) {
            $categorySlug = is_array($categorySlug) ? $categorySlug : [$categorySlug];
            $query->whereHas('categories', function ($categoryQuery) use ($categorySlug) {
                $categoryQuery->whereIn('slug', $categorySlug);
            });
        }
        if ($slug) {
            $query->where('slug', $slug);
        }
        if ($withTags) {
            $query->with(['tags', 'tags.tag_image', 'tags.tag_group']);
        }
        if ($withCategories) {
            $query->with(['categories']);
        }
        if ($withMainCategory) {
            $query->with(['main_category']);
        }
        if ($withGallery) {
            $query->with(['gallery']);
        }
        if ($withMenu) {
            $query->with([
                'restaurant_menu' => function ($query) {
                    $query
                        ->orderBy('active', 'DESC')
                        ->orderBy('relations_updated_at', 'DESC')
                        ->limit(1);
                },
                'restaurant_menu.food_categories',
                'restaurant_menu.food_categories.foods',
                'restaurant_menu.food_categories.foods.food_size_prices' => function ($query) {
                    $query
                        ->whereHas('food_addon_group', function ($groupQuery) {
                            $groupQuery->where('type', 'size');
                        })
                        ->orderBy('pivot_overridden_price', 'ASC');
                },
                'restaurant_menu.food_categories.foods.food_image',
            ]);
            if ($withFoodLikes && $user) {
                $query->with(['restaurant_menu.food_categories.foods.user_like_history']);
            }
        }
        if ($withBadges) {
            $query->with([
                'badge_tag_group',
                'badge_tag_group.tags'
            ]);
        }
        if ($withRatings) {
            $query->with(['location_ratings']);
            if ($withUserId) {
                if (Auth::check()) {
                    $query->with(['location_ratings.location_rating_history' => function ($query) {
                        $user = Auth::getUser();
                        $query->where('user_id', $user->id);
                    }]);
                }
            } else {
                $query->with(['location_ratings.location_rating_histories']);
            }
        }
        if ($withOtherInfo) {
            $query->with([
                'other_informations',
                'other_informations.tag'
            ]);
        }
        if ($withRelatedLocations) {
            $query->with(
                'related_locations',
                'related_locations.categories',
                'related_locations.cover_image'
            );
        }
        if ($withWorkingTime) {
            $query->with(['working_time', 'delivery_working_time']);
        }
        return $query->with(['cover_image', 'logo']);
    }

    public function loadFERelations($options)
    {
        /**
         * Default options
         * @var $withUserId
         * @var $withLocationBadgesHistory
         * @var $withUserBadgesHistory
         */
        extract(array_merge([
            'withUserId' => false,
            'withLocationBadgesHistory' => false,
            'withUserBadgesHistory' => false,
        ], $options));

        if ($withLocationBadgesHistory) {
            $this->load([
                'badge_tag_group.tags.location_badge_history' => function ($query) use (
                    $withUserBadgesHistory,
                    $withUserId
                ) {
                    $query->where('location_id', $this->id);
                    if ($withUserBadgesHistory) {
                        if ($withUserId) {
                            if (Auth::check()) {
                                $query->with([
                                    'user_badge_history' => function ($query) {
                                        $user = Auth::getUser();
                                        $query->where('user_id', $user->id);
                                    },
                                ]);
                            }
                        } else {
                            $query->with([
                                'users_badges_history',
                            ]);
                        }
                    }
                },
            ]);
        }
    }

    public function scopeListFrontEnd($query, $options)
    {
        /**
         * Default options
         * @var $citySlug
         * @var $categorySlug
         * @var $tags
         * @var $active
         * @var $limit
         * @var $offset
         * @var $showOnHome
         * @var $withTags
         * @var $withRelatedLocations
         * @var $withOtherInfo
         * @var $tagGroupName
         * @var $locationQuery
         * @var $sort
         *
         * @var $sortBy
         * @var $sortByOrientation
         * @var $perPage
         * @var $pageNumber
         * @var $pages
         * @var $withoutClosed
         */
        extract(array_merge([
            'citySlug' => null,
            'categorySlug' => null,
            'tags' => null,
            'active' => 1,
            'showOnHome' => null,
            'withTags' => false,
            'withRelatedLocations' => false,
            'withOtherInfo' => false,
            'tagGroupName' => null,
            'locationQuery' => null,
            'sort' => null,
            'sortBy' => null,
            'sortByOrientation' => 'desc',
            'perPage' => 10,
            'pageNumber' => 1,
            'pages' => null,
            'withoutClosed' => true,
            'withWorkingTime' => false,
        ], $options));

        $searchableFields = ['name', 'type'];
        $categoryWith = [];
        $sortByOrientation = in_array($sortByOrientation, self::$availableOrientation)
            ? $sortByOrientation
            : 'desc';

        /*
         * Slug
         */
        if ($active !== null) {
            $query->where('active', $active);
        }
        if (!empty($categorySlug)) {
            $categorySlug = !is_array($categorySlug)
                ? explode(',', $categorySlug)
                : $categorySlug;
            $query->whereHas('categories', function ($categoryQuery) use ($categorySlug) {
                $categoryQuery->whereIn('slug', $categorySlug);
            });
        }
        if (!empty($citySlug)) {
            $query->whereHas('city', function ($cityQuery) use ($citySlug) {
                $cityQuery
                    ->where('slug', $citySlug)
                    ->orWhereHas('parent_city', function ($childCitiesQuery) use ($citySlug) {
                        $childCitiesQuery->where('slug', $citySlug);
                    });
            });
        }
        if (!empty($tags)) {
            $tags = is_array($tags) ? $tags : [$tags];
            $tagsData = Tag::whereIn('slug', $tags)
                ->get();
            $locationTags = $tagsData
                ->filter(function ($tag) {
                    return !$tag->is_food_tag;
                })
                ->pluck('slug')
                ->toArray();
            $foodTagIds = $tagsData
                ->filter(function ($tag) {
                    return $tag->is_food_tag;
                })
                ->pluck('id')
                ->toArray();
            if (count($locationTags)) {
                $query->whereHas('tags', function ($cityQuery) use ($locationTags) {
                    $cityQuery->whereIn('slug', $locationTags);
                }, '=', count($locationTags));
            }
            if (count($foodTagIds)) {
                $query
                    ->where(function ($query) use ($foodTagIds) {
                        $query
                            ->whereHas('foods.tag', function ($tagQuery) use ($foodTagIds) {
                                $tagQuery->whereIn('id', $foodTagIds);
                            })
                            ->orWhereHas('food_categories.tag', function ($tagQuery) use ($foodTagIds) {
                                $tagQuery->whereIn('id', $foodTagIds);
                            });
                    });
            }
        }
        if ($locationQuery) {
            $query->where('title', 'like', "%$locationQuery%");
        }
        if ($showOnHome !== null) {
            if (empty($citySlug)) {
                $query->where('show_on_home_global', 1);
            } else {
                $query->where('show_on_home', 1);
            }
        }
        if ($sort && isset(self::$availableSort[$sort])) {
            if ($sort == 'distance') {
            } else {
                $query->orderBy(self::$availableSort[$sort], $sortByOrientation);
            }
        } elseif (!empty($sortBy)) {
            $query->orderBy($sortBy, $sortByOrientation);
        }
        if ($withTags) {
            if ($tagGroupName !== null) {
                $query->whereHas('tags', function ($tagsQuery) use ($tagGroupName) {
                    $tagsQuery->whereHas('tag_group', function ($tagGroupQuery) use ($tagGroupName) {
                        $tagGroupQuery->where('slug', $tagGroupName);
                    });
                });
            }
            $query->with('tags', 'tags.tag_group');
        }
        if ($withRelatedLocations) {
            $query->with(
                'related_locations',
                'related_locations.city',
                'related_locations.categories',
                'related_locations.cover_image'
            );
        }
        if ($withOtherInfo) {
            $query->with([
                'other_informations' => function ($query) {
                    $query->where('show_in_list', 1);
                },
                'other_informations.tag'
            ]);
        }
        if ($withoutClosed) {
            $query->where('is_closed', 0);
        }
        if ($withWorkingTime) {
            $query->with(['working_time', 'delivery_working_time']);
        }
        if ($pages) {
            $perPage = $pages * $perPage;
        }
        return $query
            ->with('categories', 'cover_image', 'logo')
            ->paginate(
                $perPage,
                $pageNumber
            );
    }

    public static function getTabValue($tab)
    {
        return self::$tabs[$tab] ?? (in_array($tab, self::$tabs)
            ? $tab
            : null);
    }

    public static function getTabKey($tabValue)
    {
        $tabs = array_flip(self::$tabs);
        return $tabs[$tabValue];
    }

    public function scopeMapData($query, $options)
    {
        /**
         * Default options
         * @var $citySlug
         * @var $categorySlug
         * @var $tags
         * @var $active
         * @var $limit
         * @var $offset
         * @var $showOnHome
         * @var $withTags
         * @var $withRelatedLocations
         * @var $withOtherInfo
         * @var $tagGroupName
         * @var $locationQuery
         * @var $sort
         *
         * @var $sortBy
         * @var $sortByOrientation
         * @var $perPage
         * @var $pageNumber
         */
        extract(array_merge([
            'citySlug' => null,
            'categorySlug' => null,
            'tags' => null,
            'active' => 1,
            'showOnHome' => null,
            'withTags' => false,
            'withRelatedLocations' => false,
            'withOtherInfo' => false,
            'tagGroupName' => null,
            'locationQuery' => null,
            'sort' => null,
            'sortBy' => null,
            'sortByOrientation' => 'desc',
            'perPage' => 10,
            'pageNumber' => 1,
        ], $options));

        /*
         * Slug
         */
        if ($active !== null) {
            $query->where('active', $active);
        }
        if (!empty($categorySlug)) {
            $categorySlug = !is_array($categorySlug)
                ? explode(',', $categorySlug)
                : $categorySlug;
            $query->whereHas('categories', function ($categoryQuery) use ($categorySlug) {
                $categoryQuery->whereIn('slug', $categorySlug);
            });
        }
        if (!empty($citySlug)) {
            $query->whereHas('city', function ($cityQuery) use ($citySlug) {
                $cityQuery
                    ->where('slug', $citySlug)
                    ->orWhereHas('parent_city', function ($childCitiesQuery) use ($citySlug) {
                        $childCitiesQuery->where('slug', $citySlug);
                    });
            });
        }
        if (!empty($tags)) {
            $tags = is_array($tags) ? $tags : [$tags];
            $tagsData = Tag::whereIn('slug', $tags)
                ->get();
            $locationTags = $tagsData
                ->filter(function ($tag) {
                    return !$tag->is_food_tag;
                })
                ->pluck('slug')
                ->toArray();
            $foodTagIds = $tagsData
                ->filter(function ($tag) {
                    return $tag->is_food_tag;
                })
                ->pluck('id')
                ->toArray();
            if (count($locationTags)) {
                $query->whereHas('tags', function ($cityQuery) use ($locationTags) {
                    $cityQuery->whereIn('slug', $locationTags);
                }, '=', count($locationTags));
            }
            if (count($foodTagIds)) {
                $query
                    ->where(function ($query) use ($foodTagIds) {
                        $query
                            ->whereHas('foods.tag', function ($tagQuery) use ($foodTagIds) {
                                $tagQuery->whereIn('id', $foodTagIds);
                            })
                            ->orWhereHas('food_categories.tag', function ($tagQuery) use ($foodTagIds) {
                                $tagQuery->whereIn('id', $foodTagIds);
                            });
                    });
            }
        }
        if ($locationQuery) {
            $query->where('title', 'like', "%$locationQuery%");
        }
        if ($showOnHome !== null) {
            if (empty($citySlug)) {
                $query->where('show_on_home_global', 1);
            } else {
                $query->where('show_on_home', 1);
            }
        }
        if ($withTags) {
            if ($tagGroupName !== null) {
                $query->whereHas('tags', function ($tagsQuery) use ($tagGroupName) {
                    $tagsQuery->whereHas('tag_group', function ($tagGroupQuery) use ($tagGroupName) {
                        $tagGroupQuery->where('slug', $tagGroupName);
                    });
                });
            }
        }
        return $query
            ->with(['cover_image', 'city', 'main_category:id,slug']);
    }

    public function scopeGetSimilarList($query, $options)
    {
        /**
         * Default options
         * @var $location
         * @var $take
         */
        extract(array_merge([
            'location' => null,
            'take' => 4
        ], $options));

        if ($location === null) {
            throw new BadMethodCallException('Similar to $location must be provided!');
        }
        $locationCategories = $location->categories->pluck('name')->toArray();
        $query->whereHas('categories', function ($query) use ($locationCategories) {
            $query->whereIn('name', $locationCategories);
        });

        return $query
            ->where('slug', '<>', $location->slug)
            ->where('city_id', $location->city_id)
            ->with(['cover_image', 'logo', 'categories'])
            ->inRandomOrder()
            ->take($take);
    }

    public function beforeSave()
    {
        $this->checkMainCategoryExistInCategories();
        parent::beforeSave();
    }

    public function checkMainCategoryExistInCategories()
    {
        if ($this->relationLoaded('categories')) {
            /** @var Collection $categories */
            $categories = $this->categories;
            if ($categories->where('id', $this->main_category_id)->isEmpty()) {
                throw new ValidationException(
                    ['main_category' => $this->main_category->title . ' not exist in categories!']
                );
            }
        }
    }

    public function syncWorkingHours(array $workingHours, $relationKey)
    {
        $existingWorkingHours = $this->{$relationKey};
        $index = 0;
        $workingHoursCount = count($workingHours);

        foreach ($existingWorkingHours as $indexKey => $existingWorkingTime) {
            if ($indexKey < $workingHoursCount) {
                $existingWorkingTime->update($workingHours[$indexKey]);
            } else {
                $existingWorkingTime->delete();
            }
            $index++;
        }

        for (; $index < $workingHoursCount; $index++) {
            $newWorkingTime = WorkingTime::create($workingHours[$index]);
            $this->working_time()->attach($newWorkingTime->id, ['type' => $relationKey]);
        }
    }
}
