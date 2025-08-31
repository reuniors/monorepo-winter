<?php namespace Reuniors\Knk\Classes;

use Http;
use Illuminate\Support\Facades\DB;
use PHPHtmlParser\Options;
use Reuniors\Knk\Models\Food;
use Reuniors\Knk\Models\FoodAddon;
use Reuniors\Knk\Models\FoodAddonGroup;
use Reuniors\Knk\Models\FoodCategory;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\RestaurantMenu;
use stringEncode\Exception;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use PHPHtmlParser\Dom;

class FoodMenuSync
{
    const ATTR_CATEGORIES = 'categories';
    const ATTR_ITEMS = 'items';
    const ATTR_CODE = 'code';
    const ATTR_TYPE = 'type';
    const ATTR_MAX_SELECTION = 'maximum_selections';
    const ATTR_DEPENDENCIES = 'dependencies';
    const ATTR_ENABLED = 'enabled';
    const ATTR_IMAGES = 'images';
    const ATTR_ID = 'id';
    const ATTR_SLUG = 'slug';
    const ATTR_NAME = 'name';
    const ATTR_FOODS = 'foods';
    const ATTR_FOOD_SIZES = 'foodSizes';
    const ATTR_PRICE = 'price';
    const ATTR_FULL_PRICE = 'price';
    const ATTR_HAS_OPTIONS = 'has_options';
    const ATTR_HAS_VARIATIONS = 'has_variations';
    const ATTR_ORDER = 'order';
    const ATTR_DESCRIPTION = 'description';
    const ATTR_TIERS = 'tiers';
    const ATTR_DATA = 'data';
    const ATTR_OPTIONS = 'options';
    const ATTR_HAS_SIZES = 'hasSizes';
    const DONESI_SHOP_URL = 'https://www.donesi.com/shop/';

    const DONESI_PRODUCT_URL = 'https://api.donesi.rs/v3/shops/catalog/product';

    const WOLT_CONSUMER_URL = 'https://consumer-api.wolt.com/consumer-api/consumer-assortment/v1/venues/slug';

    const DONESI_CODE = 'do';

    const WOLT_CODE = 'wo';
    const OLD_KNK_CODE = 'kk';
    const RESTAURANT_MENU_TITLE_PREFIX = 'Jelovnik - ';

    const LOCAL_ATTR_RELATED_ADDONS = 'related_addons';
    const LOCAL_ATTR_RELATED_ADDON_ID = 'related_addon_id';
    const LOCAL_ATTR_COMBINATION_PRICE = 'combination_price';
    const LOCAL_ATTR_COMBINATION_ACTIVE = 'combination_active';
    const LOCAL_ATTR_OUTSOURCE = 'outsource';
    const LOCAL_ATTR_OUTSOURCE_CODE = 'outsource_code';

    public function findRestaurantData($locationId, $outsourceCode, $outsource = self::DONESI_CODE)
    {
        return Location::where('id', $locationId)
            ->with([
                'restaurant_menu' => function($query) use ($outsource, $outsourceCode) {
                    $query->where(self::LOCAL_ATTR_OUTSOURCE, $outsource);

                    if ($outsourceCode) {
                        $query->where(self::LOCAL_ATTR_OUTSOURCE_CODE, $outsourceCode);
                    }
                },
                'restaurant_menu.food_categories',
                'restaurant_menu.food_categories.foods',
                'restaurant_menu.food_categories.foods.manufacturer',
                'restaurant_menu.food_categories.foods.tag',
            ])
            ->first();
    }

    public function findExistingCategory($restaurantMenu, $categoryData)
    {
        if (isset($restaurantMenu) && !empty($restaurantMenu->food_categories)) {
            return $restaurantMenu->food_categories
                ->where('name', $categoryData['name'])
                ->where(self::LOCAL_ATTR_OUTSOURCE, $categoryData[self::LOCAL_ATTR_OUTSOURCE])
                ->where(self::LOCAL_ATTR_OUTSOURCE_CODE, $categoryData[self::LOCAL_ATTR_OUTSOURCE_CODE])
                ->first();
        }
    }

    public function findExistingFood($category, $foodData)
    {
        if (isset($category) && !empty($category->foods)) {
            return $category->foods
                ->where('name', $foodData['name'])
                ->where(self::LOCAL_ATTR_OUTSOURCE, $foodData[self::LOCAL_ATTR_OUTSOURCE])
                ->where(self::LOCAL_ATTR_OUTSOURCE_CODE, $foodData[self::LOCAL_ATTR_OUTSOURCE_CODE])
                ->first();
        }
    }

    public function findExistingAddonGroup($food, $addonGroupsData)
    {
        $addonGroupQuery = isset($food) && !empty($food->food_addon_groups)
            ? $food->food_addon_groups
            : FoodAddonGroup::query();

        return $addonGroupQuery
            ->where('name', $addonGroupsData['name'])
            ->where(self::LOCAL_ATTR_OUTSOURCE, $addonGroupsData[self::LOCAL_ATTR_OUTSOURCE])
            ->where(self::LOCAL_ATTR_OUTSOURCE_CODE, $addonGroupsData[self::LOCAL_ATTR_OUTSOURCE_CODE])
            ->first();
    }

    public function findExistingAddon($addonGroup, $addonData)
    {
        if (isset($addonGroup) && !empty($addonGroup->food_addons)) {
            return $addonGroup->food_addons
                ->where('name', $addonData['name'])
                ->where(self::LOCAL_ATTR_OUTSOURCE, $addonData[self::LOCAL_ATTR_OUTSOURCE])
                ->where(self::LOCAL_ATTR_OUTSOURCE_CODE, $addonData[self::LOCAL_ATTR_OUTSOURCE_CODE])
                ->first();
        }
        return null;
    }

    /**
     * @param $depAddons
     * @return array
     */
    public function getAddonsDependencies($depAddons): array
    {
        $depAddonCodes = array_column($depAddons, 'code');
        $returnAddonsDependencies = [];
        if (!empty($depAddonCodes) && is_array($depAddonCodes)) {
            $addons = FoodAddon::whereIn(self::LOCAL_ATTR_OUTSOURCE_CODE, $depAddonCodes)
                ->where(self::LOCAL_ATTR_OUTSOURCE, self::DONESI_CODE)
                ->get()
                ->keyBy(self::LOCAL_ATTR_OUTSOURCE_CODE);
            foreach ($depAddons as $oneDepAddon) {
                if (!empty($addons[$oneDepAddon[self::ATTR_CODE]])) {
                    $oneAddon = $addons[$oneDepAddon[self::ATTR_CODE]];
                    $returnAddonsDependencies[] = [
                        self::LOCAL_ATTR_RELATED_ADDONS => [
                            [
                                self::LOCAL_ATTR_RELATED_ADDON_ID => $oneAddon->id
                            ]
                        ],
                        self::LOCAL_ATTR_COMBINATION_PRICE => $oneDepAddon[self::ATTR_PRICE],
                        self::LOCAL_ATTR_COMBINATION_ACTIVE =>$oneDepAddon[self::ATTR_ENABLED],
                    ];
                }
            }
        }
        return $returnAddonsDependencies;
    }

    public function createFoodTagIfNotExists(Food $food)
    {
        if (empty($food->tag_id)) {
            $food->attachTagBySlug($food->slug, $food->title);
        }
    }

    public function syncDataFromDonesi($reqData)
    {
        $url = $reqData['url'];
        $locationId = $reqData['location_id'];
        $content = Http::get($url);
        preg_match('/"shopID":(.*)\,/', $content, $m);
        if (!isset($m[1])) {
            throw new BadRequestHttpException('ShopID not exists in content');
        }
        $menuId = trim($m[1]);
        $getMenu = Http::get(self::DONESI_SHOP_URL . "/$menuId/menu");
        $menuData = json_decode($getMenu, true);
        if ($locationId) {
            $locationData = $this->findRestaurantData($locationId, $menuId);
        }
        if (!isset($locationData)) {
            throw new BadRequestHttpException('Location not exists: ' . $locationId);
        }
        if (!empty($menuData[self::ATTR_CATEGORIES])) {
            $restaurantMenuData = $locationData->restaurant_menu->first();
            $isNewMenu = empty($restaurantMenuData);
            if ($isNewMenu) {
                $restaurantMenuData = new RestaurantMenu();
                $newRestaurantMenuTitle = self::RESTAURANT_MENU_TITLE_PREFIX . $locationData->title;
                $restaurantMenuData->title = $newRestaurantMenuTitle;
                $restaurantMenuData->name = S::camel($newRestaurantMenuTitle, $menuId);
                $restaurantMenuData->slug = S::slug($newRestaurantMenuTitle, $menuId);
                $restaurantMenuData->outsource = self::DONESI_CODE;
                $restaurantMenuData->outsource_code = $menuId;
                $restaurantMenuData->save();
                $locationData->restaurant_menu()->attach($restaurantMenuData->id);
            }
            $foodCategories = $menuData[self::ATTR_CATEGORIES];
            foreach ($foodCategories as $oneFoodCategory) {
                $categoryTitle = $oneFoodCategory[self::ATTR_NAME];
                $categoryData = [
                    'title' => $categoryTitle,
                    'name' => S::camel($categoryTitle, $oneFoodCategory[self::ATTR_ID]),
                    'slug' => S::slug($categoryTitle, $oneFoodCategory[self::ATTR_ID]),
                    self::LOCAL_ATTR_OUTSOURCE => self::DONESI_CODE,
                    self::LOCAL_ATTR_OUTSOURCE_CODE => $oneFoodCategory[self::ATTR_ID],
                ];
                $isNewCategory = false;
                if ($isNewMenu ||
                    empty($foodCategoryData = $this->findExistingCategory(
                        $restaurantMenuData,
                        $categoryData
                    ))
                ) {
                    $isNewCategory = true;
                    $foodCategoryData = FoodCategory::createNew($categoryData);
                    $restaurantMenuData->food_categories()->attach($foodCategoryData->id);
                }
                if (!$isNewCategory) {
                    $hasDifferentCategoryData = false;
                    foreach ($categoryData as $categoryAttrName => $categoryAttrValue) {
                        if ($foodCategoryData->$categoryAttrName != $categoryAttrValue) {
                            $foodCategoryData->$categoryAttrName = $categoryAttrValue;
                            $hasDifferentCategoryData = true;
                        }
                    }
                    if ($hasDifferentCategoryData) {
                        $foodCategoryData->save();
                    }
                }

                $foodItems = $oneFoodCategory[self::ATTR_ITEMS];
                if (!empty($foodItems)) {
                    foreach ($foodItems as $oneFoodItem) {
                        $foodTitle = $oneFoodItem[self::ATTR_NAME];
                        $foodData = [
                            'title' => $foodTitle,
                            'name' => S::camel($foodTitle, $oneFoodItem[self::ATTR_CODE]),
                            'slug' => S::slug($foodTitle, $oneFoodItem[self::ATTR_CODE]),
                            self::LOCAL_ATTR_OUTSOURCE => self::DONESI_CODE,
                            self::LOCAL_ATTR_OUTSOURCE_CODE => $oneFoodItem[self::ATTR_CODE],
                            'has_prices' => $oneFoodItem[self::ATTR_HAS_VARIATIONS],
                            'has_addons' => $oneFoodItem[self::ATTR_HAS_OPTIONS],
                            'price' => $oneFoodItem[self::ATTR_PRICE],
                            'food_category_id' => $foodCategoryData->id,
                        ];
                        $isNewFood = false;
                        if ($isNewCategory ||
                            empty($food = $this->findExistingFood(
                                $foodCategoryData,
                                $foodData
                            ))
                        ) {
                            $isNewFood = true;
                            $food = Food::createNew($foodData);
                            $this->createFoodTagIfNotExists($food);
                        }
                        if (!$isNewFood) {
                            $hasDifferentFoodData = false;
                            foreach ($foodData as $foodAttrName => $foodAttrValue) {
                                if ($food->$foodAttrName != $foodAttrValue) {
                                    $food->$foodAttrName = $foodAttrValue;
                                    $hasDifferentFoodData = true;
                                }
                            }
                            if ($hasDifferentFoodData) {
                                $food->save();
                            }
                        }
                        if ($oneFoodItem[self::ATTR_HAS_VARIATIONS]) {
                            $foodDataResponse = Http::get(
                                self::DONESI_PRODUCT_URL .
                                "?shop_id=$menuId&item_code={$oneFoodItem[self::ATTR_CODE]}"
                            );
                            $oneFoodFullData = json_decode($foodDataResponse, true);
                            if (!empty($oneFoodFullData[self::ATTR_DATA])) {
                                $addonsGroups = !empty($oneFoodFullData[self::ATTR_DATA][self::ATTR_TIERS])
                                    ? $oneFoodFullData[self::ATTR_DATA][self::ATTR_TIERS]
                                    : null;
                                if (empty($addonsGroups)) {
                                    continue;
                                }
                                foreach ($addonsGroups as $oneAddonsGroup) {
                                    $addonGroupTitle = LanguageHelpers::getTranslated($oneAddonsGroup[self::ATTR_NAME]);
                                    $foodAddonType = $oneAddonsGroup[self::ATTR_NAME] === 'Sizes' ? 'size' : null;
                                    $foodAddonGroupData = [
                                        'title' => $addonGroupTitle,
                                        'name' => S::camel($addonGroupTitle, $oneAddonsGroup[self::ATTR_CODE]),
                                        'input_type' => $oneAddonsGroup[self::ATTR_TYPE],
                                        'is_required' => $oneAddonsGroup[self::ATTR_TYPE] !== 'checkbox' ? 1 : 0,
                                        'combine_type' => $oneAddonsGroup[self::ATTR_TYPE] !== 'checkbox'
                                            ? 'exclusively'
                                            : 'combined',
                                        'type' => $foodAddonType,
                                        self::LOCAL_ATTR_OUTSOURCE => self::DONESI_CODE,
                                        self::LOCAL_ATTR_OUTSOURCE_CODE => $oneAddonsGroup[self::ATTR_CODE],
                                        'max_addons' => $oneAddonsGroup[self::ATTR_MAX_SELECTION],
                                    ];
                                    $isNewFoodAddonGroup = false;
                                    if ($isNewFood ||
                                        empty($foodAddonGroup = $this->findExistingAddonGroup(
                                            $food,
                                            $foodAddonGroupData
                                        ))
                                    ) {
                                        $isNewFoodAddonGroup = true;
                                        $foodAddonGroup = FoodAddonGroup::createNew($foodAddonGroupData);
                                        $food->food_addon_groups()->attach($foodAddonGroup->id);
                                    }
                                    if (!$isNewFoodAddonGroup) {
                                        $hasDifferentAddonGroupData = false;
                                        foreach ($foodAddonGroupData as $attrName => $attrValue) {
                                            if ($foodAddonGroup->$attrName != $attrValue) {
                                                $foodAddonGroup->$attrName = $attrValue;
                                                $hasDifferentAddonGroupData = true;
                                            }
                                        }
                                        if ($hasDifferentAddonGroupData) {
                                            $foodAddonGroup->save();
                                        }
                                    }
                                    if (!empty($oneAddonsGroup[self::ATTR_OPTIONS])) {
                                        $foodAddons = $oneAddonsGroup[self::ATTR_OPTIONS];
                                        foreach ($foodAddons as $oneAddon) {
                                            $addonTitle = LanguageHelpers::getTranslated($oneAddon[self::ATTR_NAME]);
                                            $foodAddonData = [
                                                'title' => $addonTitle,
                                                'name' => S::camel($addonTitle, $oneAddon[self::ATTR_CODE]),
                                                'food_addon_group_id' => $foodAddonGroup->id,
                                                'addons_dependencies' => $this->getAddonsDependencies(
                                                    $oneAddon[self::ATTR_DEPENDENCIES]
                                                ),
                                                self::LOCAL_ATTR_OUTSOURCE => self::DONESI_CODE,
                                                self::LOCAL_ATTR_OUTSOURCE_CODE => $oneAddon[self::ATTR_CODE],
                                            ];
                                            if ($foodAddonType !== 'size') {
                                                $foodAddonData['price'] = $oneAddon[self::ATTR_PRICE];
                                            }
                                            $isNewFoodAddon = false;
                                            if ($isNewFoodAddonGroup ||
                                                empty($foodAddon = $this->findExistingAddon(
                                                    $foodAddonGroup,
                                                    $foodAddonData
                                                ))
                                            ) {
                                                $isNewFoodAddon = true;
                                                $foodAddon = FoodAddon::createNew($foodAddonData);
                                            }
                                            if (!$isNewFoodAddon) {
                                                $hasDifferentAddonData = false;
                                                foreach ($foodAddonData as $attrName => $attrValue) {
                                                    if ($foodAddon->$attrName != $attrValue) {
                                                        $foodAddon->$attrName = $attrValue;
                                                        $hasDifferentAddonData = true;
                                                    }
                                                }
                                                if ($hasDifferentAddonData) {
                                                    $foodAddon->save();
                                                }
                                            }
                                            if ($foodAddonType === 'size') {
                                                $foodAddon->updatePrice($food->id, $oneAddon[self::ATTR_PRICE]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    public function syncDataFromOldMenu($reqData)
    {
        $locationId = $reqData['location_id'];
        $url = $reqData['url'];
        if (empty($url) || empty($locationId) || empty($location = Location::where('id', $locationId)->first())) {
            throw new BadRequestHttpException();
        }
        $explodedUrl = array_filter(explode('/', $url));
        $menuSlug = $explodedUrl[count($explodedUrl)];
        if (!empty($location->restaurant_menu->count())) {
            throw new Exception('Jelovnik za ovu lokaciju vec postoji - ' . $location->title);
        }
        $db = DB::connection('mysql2');
        $oldMenuData = $this->getOldMenuDataFromHtmlTable($db, $location, $menuSlug);
//        if (!isset($ne)) {
//            return null;
//        }
        if (!empty($oldMenuData['categories'])) {
            try {
//                DB::beginTransaction();

                $location = Location::where('id', $locationId)->first();
                $newRestaurantMenuTitle = self::RESTAURANT_MENU_TITLE_PREFIX . $location->title;
                $existingRestaurant = RestaurantMenu::where('title', $newRestaurantMenuTitle)->first();
                if ($existingRestaurant !== null) {
                    return;
                }
                $restaurantMenu = new RestaurantMenu();
                $restaurantMenu->title = $newRestaurantMenuTitle;
                $restaurantMenu->name = S::camel($newRestaurantMenuTitle);
                $restaurantMenu->slug = S::slug($newRestaurantMenuTitle);
                $restaurantMenu->outsource = self::OLD_KNK_CODE;
                $restaurantMenu->outsource_code = $menuSlug;
                $restaurantMenu->save();
                $createdFoodAddons = [];
                if ($oldMenuData['hasSizes']) {
                    $addonGroupTitle = 'Veličine';
                    $foodAddonType = 'size';
                    $foodAddonGroupData = [
                        'title' => $addonGroupTitle,
                        'name' => S::camel($addonGroupTitle),
                        'input_type' => 'radio',
                        'is_required' => 1,
                        'combine_type' => 'exclusively',
                        'type' => $foodAddonType,
                        self::LOCAL_ATTR_OUTSOURCE => self::OLD_KNK_CODE,
                    ];
                    $foodAddonGroup = FoodAddonGroup::createNew($foodAddonGroupData);
                    if (!empty($oldMenuData['addonSizeNames'])) {
                        foreach ($oldMenuData['addonSizeNames'] as $foodAddonKey => $foodAddonNames) {
                            $createdFoodAddons[$foodAddonKey] = [
                                'groupId' => $foodAddonGroup->id,
                                'foodAddons' => []
                            ];
                            foreach ($foodAddonNames as $oneFoodAddon) {
                                $addonTitle = LanguageHelpers::getTranslated($oneFoodAddon);
                                $foodAddonData = [
                                    'title' => $addonTitle,
                                    'name' => S::camel($addonTitle),
                                    'food_addon_group_id' => $foodAddonGroup->id,
                                    self::LOCAL_ATTR_OUTSOURCE => self::OLD_KNK_CODE,
                                ];
                                $foodAddon = FoodAddon::createNew($foodAddonData);
                                $createdFoodAddons[$foodAddonKey]['foodAddons'][$oneFoodAddon] = $foodAddon;
                            }
                        }
                    }
                }
                $location->restaurant_menu()->attach($restaurantMenu->id);
                foreach ($oldMenuData[self::ATTR_CATEGORIES] as $oldMenuFoodCategoryData) {
                    $categoryTitle = $oldMenuFoodCategoryData[self::ATTR_NAME];
                    $categoryData = [
                        'title' => $categoryTitle,
                        'name' => S::camel($categoryTitle),
                        'slug' => S::slug($categoryTitle),
                    ];
                    $foodCategory = FoodCategory::createNew($categoryData);
                    $restaurantMenu->food_categories()->attach($foodCategory->id);
                    $hasSizes = !empty($oldMenuFoodCategoryData[self::ATTR_HAS_SIZES]);
                    foreach ($oldMenuFoodCategoryData[self::ATTR_FOODS] as $oneFood) {
                        $foodTitle = $oneFood[self::ATTR_NAME];
                        $foodData = [
                            'title' => $foodTitle,
                            'name' => S::camel($foodTitle),
                            'slug' => S::slug($foodTitle),
                            'description' => $oneFood[self::ATTR_DESCRIPTION],
                            'food_category_id' => $foodCategory->id,
                        ];
                        if (!$hasSizes) {
                            $foodData['price'] = $oneFood[self::ATTR_PRICE] ?? 0;
                        }
                        $food = Food::createNew($foodData);
                        if ($hasSizes && !empty($oneFood[self::ATTR_FOOD_SIZES])) {
                            $foodAddonsKey = $oldMenuFoodCategoryData['foodAddonsKey'];
                            $food->food_addon_groups()->attach($createdFoodAddons[$foodAddonsKey]['groupId']);
                            foreach ($oneFood[self::ATTR_FOOD_SIZES] as $foodSizeName => $foodSizePrice) {
                                $existingFoodAddon = $createdFoodAddons[$foodAddonsKey]['foodAddons'][$foodSizeName];
                                $food->food_size_prices()->attach(
                                    $existingFoodAddon->id,
                                    [
                                        'overridden_price' => $foodSizePrice ?? 0
                                    ]
                                );
                            }
                        }
                    }
                }

                DB::commit();
            } catch(\Exception $e){
                DB::rollback();
            }
        }
    }

    public function oldMenuUpdateTempLocationTable($reqData)
    {
        $locationId = $reqData['location_id'];
        $url = $reqData['url'];
        if (empty($url) || empty($locationId) || empty($location = Location::where('id', $locationId)->first())) {
            throw new BadRequestHttpException();
        }
        $explodedUrl = array_filter(explode('/', $url));
        $menuSlug = $explodedUrl[count($explodedUrl)];
        $db = DB::connection('mysql2');
        $oldFoodMenu = $db->table('wp_posts')
            ->where('post_name', $menuSlug)
            ->first();
        if ($oldFoodMenu !== null && !empty($oldFoodMenu->post_content)) {
            $location->old_menu_data = $oldFoodMenu->post_content;
            $location->forceSave();
        }
    }

    public function oldMenuDataAddCategory($menuData)
    {
//        if ($menuData)
    }

    public function oldMenuGetName($col)
    {
        if ($col instanceof Dom\Node\HtmlNode) {
            if ($col->hasChildren() && $col->countChildren() > 1) {
                $colChildren = $col->getChildren();
                $col = $colChildren[0];
            }
            $bTag = $col->find('b');
            return $bTag && !empty($bTag[0])
                ? str_replace("\n", ' ', $bTag->text)
                : $col->text;
        } else {
            return $col;
        }
    }

    public function getDescription($description)
    {
        if ($description) {
            $matchRegex = '/\((.*?)\)/';
            preg_match($matchRegex, $description, $m);
            if (isset($m[1])) {
                return $m[1];
            }
        }
    }

    public function populateNameAndDescription($col, &$name, &$description)
    {
        if ($col && $col->text) {
            $txtArray = explode("\n", $col->text);
            if (isset($txtArray[1])) {
                $name = $txtArray[0];
                $description = $txtArray[1];
            }
        }
    }

    public function getOldMenuDataFromHtmlTable($db, $location, $menuSlug)
    {
        $menuData = [
            'categories' => [],
            'hasSizes' => false,
            'addonSizeNames' => [],
        ];
        $oldFoodMenu = $db->table('wp_posts')
            ->where('post_name', $menuSlug)
            ->first();
        if ($oldFoodMenu !== null && !empty($oldFoodMenu->post_content)) {
            $options = new Options();
            $options->setPreserveLineBreaks(true);
            $dom = new Dom;
            $dom->loadStr($oldFoodMenu->post_content, $options);
            $rows = $dom->find('tr');
            $sizesCount = 0;
            $lastAddons = [];
            $foodCategoryTitle = null;
            $foodAddonsKey = null;
            foreach ($rows as $rowIndex => $row) {
                $th = $row->find('th')[0];
                if (!empty($th)) {
                    $foodCategoryTitle = $th->text;
                    if (empty($foodCategoryTitle)) {
                        $foodCategoryTitle = 'Sva jela';
                    }
                    $menuData['categories'][$foodCategoryTitle] = [
                        'name' => $foodCategoryTitle,
                        'foods' => [],
                        'foodAddons' => [],
                    ];
                } else {
                    $rowCols = $row->find('td');
                    $countRowCols = count($rowCols);
                    $foodName = null;
                    $isSizes = false;
                    $currentSizesCount = null;
                    $firstTd = $rowCols[0];
                    $firstTdText = $this->oldMenuGetName($firstTd);
                    if (empty($foodCategoryTitle)) {
                        $foodCategoryTitle = 'Sva jela';
                    }
                    if (empty($menuData['categories'][$foodCategoryTitle])) {
                        $menuData['categories'][$foodCategoryTitle] = [
                            'name' => $foodCategoryTitle,
                            'foods' => [],
                            'foodAddons' => [],
                        ];
                    }
                    if (!empty($firstTdText)) {
                        $currentSizesCount = 0;
                        foreach ($rowCols as $colIndex => $colData) {
                            if ($colIndex) {
                                $sizeName = $this->oldMenuGetName($colData);
                                if (!empty($sizeName)) {
                                    $currentSizesCount++;
                                }
                            }
                        }
                    }
                    foreach ($rowCols as $colIndex => $colData) {
                        if (!$colIndex && $currentSizesCount === null) {
                            $isSizes = true;
                            $menuData['hasSizes'] = true;
                            continue;
                        } else {
                            $hasSizes = count($lastAddons) === $currentSizesCount;
                        }
                        if ($isSizes) {
                            $sizeName = $this->oldMenuGetName($colData);
                            if (empty($sizeName)) {
                                continue;
                            }
                            $menuData['categories'][$foodCategoryTitle]['foodAddons'][$colIndex] = $sizeName;
                            if ($colIndex === $countRowCols - 1) {
                                $lastAddons = $menuData['categories'][$foodCategoryTitle]['foodAddons'];
                                $foodAddonsKey = HelperCommon::implodeLikeCamelCase($lastAddons);
                                $menuData['addonSizeNames'][$foodAddonsKey] = $lastAddons;
                                $menuData['categories'][$foodCategoryTitle]['foodAddonsKey'] = $foodAddonsKey;
                                $isSizes = false;
                            }
                            $sizesCount++;
                            continue;
                        }
                        if (empty($foodName)) {
                            $foodDescription = null;
                            $this->populateNameAndDescription($colData, $foodName, $foodDescription);
                            if (empty($foodDescription)) {
                                $foodDescription = $this->getDescription($colData->text);
                                $foodName = $this->oldMenuGetName($colData);
                                $foodName = trim(str_replace(
                                    '(' . $foodDescription . ')',
                                    '',
                                    $foodName
                                ));
                            } else {
                                if (empty($foodName)) {
                                    $foodName = $this->oldMenuGetName($colData);
                                }
                                $foodDescriptionTemp = $this->getDescription($foodName);
                                $foodName = trim(str_replace(
                                    '(' . $foodDescriptionTemp . ')',
                                    '',
                                    $foodName
                                ));
                            }
                            if (HelperCommon::hasNumberInString($colData, 1)) {
                                $foodName .= ' - ' . $foodDescription;
                            }
                            if (isset($menuData['categories'][$foodCategoryTitle]['foods'][$foodName])) {
                                $foodName .= ' - ' . (count($menuData['categories'][$foodCategoryTitle]['foods'][$foodName]) + 1);
                            }
                            $menuData['categories'][$foodCategoryTitle]['foods'][$foodName] = [
                                'name' => $foodName,
                                'foodSizes' => [],
                                'price' => null,
                                'description' => $foodDescription,
                            ];
                        } elseif ($hasSizes) {
                            $menuData['categories'][$foodCategoryTitle]['hasSizes'] = true;
                            if (
                                !empty($foodAddonsKey) &&
                                empty($menuData['categories'][$foodCategoryTitle]['foodAddonsKey'])
                            ) {
                                $menuData['categories'][$foodCategoryTitle]['foodAddonsKey'] = $foodAddonsKey;
                            }
                            $foodSizePrice = $this->oldMenuGetName($colData);
                            if (!empty($foodSizePrice)) {
                                $foodSizePrice = (float) trim($foodSizePrice);
                                $foodAddonName = $lastAddons[$colIndex];
                                $menuData['categories'][$foodCategoryTitle]['foods'][$foodName]['foodSizes'][$foodAddonName] = $foodSizePrice;
                            }
                        } elseif (!$hasSizes && $colIndex === $countRowCols - 1) {
                            $foodSizePrice = $this->oldMenuGetName($colData);
                            $foodSizePrice = (int) trim($foodSizePrice);
                            $menuData['categories'][$foodCategoryTitle]['foods'][$foodName]['price'] = $foodSizePrice;
                        } elseif (!$hasSizes && $colIndex && $colIndex === $countRowCols - 2) {
                            $foodSize = $this->oldMenuGetName($colData);
                            $oldFoodData = $menuData['categories'][$foodCategoryTitle]['foods'][$foodName];
                            $foodDescription = $oldFoodData['description'];
                            $foodDescription = $foodSize . ($foodDescription ? ' (' . $foodDescription . ')' : '') ;
                            $newFoodName = $foodName . ' ' . $foodSize;
                            unset($menuData['categories'][$foodCategoryTitle]['foods'][$foodName]);
                            $menuData['categories'][$foodCategoryTitle]['foods'][$newFoodName] = $oldFoodData;
                            $menuData['categories'][$foodCategoryTitle]['foods'][$newFoodName]['description'] = $foodDescription;
                            $foodName = $newFoodName;
                        }
                    }
                }
            }
        }
        return $menuData;
    }
}
