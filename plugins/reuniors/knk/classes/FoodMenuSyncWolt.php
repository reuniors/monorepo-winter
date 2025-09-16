<?php namespace Reuniors\Knk\Classes;

use Http;
use Reuniors\Knk\Models\Food;
use Reuniors\Knk\Models\FoodAddon;
use Reuniors\Knk\Models\FoodAddonGroup;
use Reuniors\Knk\Models\FoodCategory;
use Reuniors\Knk\Models\RestaurantMenu;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use System\Models\File;

class FoodMenuSyncWolt extends FoodMenuSync
{
    const ATTR_OPTION_ID = 'option_id';
    const ATTR_ITEM_IDS = 'item_ids';
    const ATTR_ORIGINAL_PRICE = 'original_price';
    const ATTR_CHOICE_CONFIG = 'multi_choice_config';
    const ATTR_TOTAL_RANGE = 'total_range';
    const ATTR_MIN = 'min';
    const ATTR_MAX = 'max';
    const ATTR_VALUES = 'values';
    const ATTR_URL = 'url';
    const ATTR_PRE_REQ = 'prerequisite_values';
    const CATEGORY_DATA = 'category_data';

    public function getAddonGroupDependency(array $addonGroupData, array $foodOptionsGroups)
    {
        if (!empty($addonGroupData[self::ATTR_PRE_REQ])) {
            $ids = $addonGroupData[self::ATTR_PRE_REQ];
            foreach ($foodOptionsGroups as $oneAddonsGroup) {
                $listOfAddons = $oneAddonsGroup[self::ATTR_VALUES] ?? [];
                $listOfAddons = array_filter($listOfAddons, function ($addon) use ($ids) {
                    return in_array($addon[self::ATTR_ID], $ids);
                });
                if (!empty($listOfAddons)) {
                    break;
                }
            }
            if (!empty($listOfAddons)) {
                return FoodAddon::query()
                    ->whereIn(self::LOCAL_ATTR_OUTSOURCE_CODE, array_column($listOfAddons, self::ATTR_ID))
                    ->get()
                    ->pluck('id') ?? null;
            }
        }
        return null;
    }

    public function syncDataFromWolt(array $reqData)
    {
        /**
         * @var $url
         * @var $locationId
         */
        extract($reqData);

        $urlParts = explode('/', $url);
        $slug = end($urlParts);
        $woltConsumerUrl = self::WOLT_CONSUMER_URL;
        $menuRoute = "$woltConsumerUrl/$slug/assortment";

        $apiContent = Http::get($menuRoute);
        $responseData = json_decode($apiContent->body, true);
        $foodItems = $responseData['items'] ?? null;

        if (!$foodItems) {
            return null;
        }

        $menuId = '-' . $responseData['assortment_id'];
        $categories = $responseData['categories'] ?? [];
        $allOptions = array_column($responseData['options'] ?? [], null, self::ATTR_ID);
        $locationData = $this->findRestaurantData($locationId, null, self::WOLT_CODE);

        if (!isset($locationData)) {
            throw new BadRequestHttpException('Location not exists: ' . $locationId);
        }

        $restaurantMenuData = $locationData->restaurant_menu->first();
        $isNewMenu = empty($restaurantMenuData);

        if ($isNewMenu) {
            $restaurantMenuData = new RestaurantMenu();
            $newRestaurantMenuTitle = self::RESTAURANT_MENU_TITLE_PREFIX . $locationData->title;
            $restaurantMenuData->title = $newRestaurantMenuTitle;
            $restaurantMenuData->name = S::camel($newRestaurantMenuTitle, $menuId);
            $restaurantMenuData->slug = S::slug($newRestaurantMenuTitle, $menuId);
            $restaurantMenuData->outsource = self::WOLT_CODE;
            $restaurantMenuData->outsource_code = $slug;
            $restaurantMenuData->save();
            $locationData->restaurant_menu()->attach($restaurantMenuData->id);
        }

        foreach ($categories as &$oneCategory) {
            $categoryTitle = $oneCategory[self::ATTR_NAME];
            $categoryData = [
                'title' => $categoryTitle,
                'name' => S::camel($categoryTitle, $oneCategory[self::ATTR_ID]),
                'slug' => S::slug($categoryTitle, $oneCategory[self::ATTR_SLUG]),
                self::LOCAL_ATTR_OUTSOURCE => self::WOLT_CODE,
                self::LOCAL_ATTR_OUTSOURCE_CODE => $oneCategory[self::ATTR_ID],
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
            $oneCategory[self::CATEGORY_DATA] = $foodCategoryData;
        }
        unset($oneCategory);

        if (!empty($foodItems)) {
            foreach ($foodItems as $oneFoodItem) {
                foreach ($categories as $oneCategory) {
                    if (in_array($oneFoodItem[self::ATTR_ID], $oneCategory[self::ATTR_ITEM_IDS])) {
                        $foodCategoryData = $oneCategory[self::CATEGORY_DATA];
                        break;
                    }
                }
                if (!isset($foodCategoryData)) {
                    throw new BadRequestHttpException('Category not found for food item: ' . $oneFoodItem[self::ATTR_ID]);
                }
                $foodTitle = $oneFoodItem[self::ATTR_NAME];
                $foodOptions = $oneFoodItem[self::ATTR_OPTIONS] ?? null;
                $foodData = [
                    'title' => $foodTitle,
                    'name' => S::camel($foodTitle, $oneFoodItem[self::ATTR_ID]),
                    'slug' => S::slug($foodTitle, $oneFoodItem[self::ATTR_ID]),
                    self::LOCAL_ATTR_OUTSOURCE => self::WOLT_CODE,
                    self::LOCAL_ATTR_OUTSOURCE_CODE => $oneFoodItem[self::ATTR_ID],
                    self::ATTR_DESCRIPTION => $oneFoodItem[self::ATTR_DESCRIPTION] ?? null,
                    'has_prices' => false,
                    'has_addons' => !empty($foodOptions),
                    'price' => ($oneFoodItem[self::ATTR_ORIGINAL_PRICE] ?? $oneFoodItem[self::ATTR_PRICE] ?? 0) / 100,
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
                    if (!empty($oneFoodItem[self::ATTR_IMAGES])) {
                        $imageData = last($oneFoodItem[self::ATTR_IMAGES]);
                        $file = (new File)->fromUrl($imageData[self::ATTR_URL]);
                        $food->food_image()->add($file);
//                        ImageToWebpAction::run($file);
                    }
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
                if (!empty($foodOptions)) {
                    $foodOptionsGroups = [];
                    foreach ($foodOptions as $oneFoodOptionData) {
                        if (isset($allOptions[$oneFoodOptionData[self::ATTR_OPTION_ID]])) {
                            $foodOptionsGroups[] = [
                                ...$oneFoodOptionData,
                                ...$allOptions[$oneFoodOptionData[self::ATTR_OPTION_ID]],
                            ];
                        }
                    }
                    if (empty($foodOptionsGroups)) {
                        continue;
                    }
                    foreach ($foodOptionsGroups as $oneAddonsGroup) {
                        $addonGroupTitle = \Reuniors\Base\Classes\Helpers\LanguageHelpers::getTranslated($oneAddonsGroup[self::ATTR_NAME]);
                        $foodAddonType = null; // $oneAddonsGroup[self::ATTR_TYPE] === 'choice' ? 'size' : null;
                        $maxAddons = $oneAddonsGroup[self::ATTR_CHOICE_CONFIG][self::ATTR_TOTAL_RANGE][self::ATTR_MAX] ?? null;
                        $minAddons = $oneAddonsGroup[self::ATTR_CHOICE_CONFIG][self::ATTR_TOTAL_RANGE][self::ATTR_MIN] ?? null;
                        $foodAddonGroupData = [
                            'title' => $addonGroupTitle,
                            'name' => S::camel($addonGroupTitle, $oneAddonsGroup[self::ATTR_ID]),
                            'input_type' => $oneAddonsGroup[self::ATTR_TYPE],
                            'is_required' => $oneAddonsGroup[self::ATTR_TYPE] === 'choice' ? 1 : 0,
                            'combine_type' => $oneAddonsGroup[self::ATTR_TYPE] === 'choice'
                                ? 'exclusively'
                                : 'combined',
                            'type' => $foodAddonType,
                            self::LOCAL_ATTR_OUTSOURCE => self::WOLT_CODE,
                            self::LOCAL_ATTR_OUTSOURCE_CODE => $oneAddonsGroup[self::ATTR_ID],
                            'max_addons' => $maxAddons,
                            'min_required' => $minAddons,
                            'depends_on_addons' => $this->getAddonGroupDependency($oneAddonsGroup, $foodOptionsGroups),
                        ];
                        $isNewFoodAddonGroup = false;
                        if (
                            empty($foodAddonGroup = $this->findExistingAddonGroup(
                                null,
                                $foodAddonGroupData
                            ))
                        ) {
                            $isNewFoodAddonGroup = true;
                            $foodAddonGroup = FoodAddonGroup::createNew($foodAddonGroupData);
                        }
                        $food->food_addon_groups()->syncWithoutDetaching($foodAddonGroup->id);
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
                        if (!empty($oneAddonsGroup[self::ATTR_VALUES])) {
                            $foodAddons = $oneAddonsGroup[self::ATTR_VALUES];
                            foreach ($foodAddons as $oneAddon) {
                                $addonTitle = \Reuniors\Base\Classes\Helpers\LanguageHelpers::getTranslated($oneAddon[self::ATTR_NAME]);
                                $foodAddonData = [
                                    'title' => $addonTitle,
                                    'name' => S::camel($addonTitle, $oneAddon[self::ATTR_ID]),
                                    'food_addon_group_id' => $foodAddonGroup->id,
                                    self::LOCAL_ATTR_OUTSOURCE => self::WOLT_CODE,
                                    self::LOCAL_ATTR_OUTSOURCE_CODE => $oneAddon[self::ATTR_ID],
                                ];
                                $foodAddonData['price'] = ($oneAddon[self::ATTR_PRICE] ?? 0) / 100;
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
                            }
                        }
                    }
                }
            }
        }

        return true;
    }
}
