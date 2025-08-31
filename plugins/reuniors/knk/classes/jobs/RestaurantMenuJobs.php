<?php namespace Reuniors\Knk\Classes\Jobs;

use Reuniors\Knk\Models\Food;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\RestaurantMenu;

class RestaurantMenuJobs
{
    public static function populateDescriptions(array $locationSlugs = null, $overrideExisting = false)
    {
        $foodMenusQuery = RestaurantMenu
            ::with([
                'food_categories'
            ]);
        if ($locationSlugs) {
            $foodMenusQuery->whereHas('locations', function ($query) use ($locationSlugs) {
                $query->whereIn('slug', $locationSlugs);
            });
        }
        $foodMenus = $foodMenusQuery->get();
        $limitTitles = 5;
        foreach ($foodMenus as $foodMenu) {
            if ($overrideExisting || empty($foodMenu->description)) {
                $foodCategories = $foodMenu->food_categories;
                $foodCategoriesCount = $foodCategories->count();
                $foodMenuDescription = '';
                if ($foodCategoriesCount > 0) {
                    foreach ($foodCategories as $index => $foodCategory) {
                        $foodMenuDescription .= "$foodCategory->title | ";
                        if ($index > 3) {
                            break;
                        }
                    }
                    if ($foodCategoriesCount < $limitTitles) {
                        $foods = Food
                            ::whereHas('food_category', function ($query) use ($foodMenu) {
                                $query->whereHas('restaurant_menus', function ($query) use ($foodMenu) {
                                    $query->where('id', $foodMenu->id);
                                });
                            })
                            ->limit($limitTitles - $foodCategoriesCount + 1)
                            ->inRandomOrder()
                            ->get();
//                        $foods = $foodCategories->first()
//                            ->foods()
//                            ->limit($limitTitles - $foodCategoriesCount + 1)
//                            ->get();
                        if ($foods->count() > 0) {
                            foreach ($foods as $food) {
                                $foodMenuDescription .= "$food->title | ";
                            }
                        }
                    }
                    $foodMenu->description = substr_replace($foodMenuDescription, '', -3);
                    $foodMenu->save();
                }
            }
        }
    }
}
