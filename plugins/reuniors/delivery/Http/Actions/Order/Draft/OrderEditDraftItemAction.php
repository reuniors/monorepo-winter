<?php namespace Reuniors\Delivery\Http\Actions\Order\Draft;

use Exception;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\FeGetOneLocation;

class OrderEditDraftItemAction extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['required', 'string'],
            'slug' => ['required', 'string'],
            'foodId' => ['required', 'integer'],
            'foodCategoryId' => ['integer'],
            'quantity' => ['required', 'integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $citySlug = $attributes['citySlug'];
        $slug = $attributes['slug'];
        $foodId = (int)$attributes['foodId'];
        $quantity = (int)$attributes['quantity'];
        $foodCategoryId = (int)$attributes['foodCategoryId'] ?? null;

        $location = FeGetOneLocation::run([
            'citySlug' => $citySlug,
            'slug' => $slug,
        ]);

        $existingDraftOrder = OrderFindDraftAction::run([
            'locationId' => $location->id,
        ]);
        if (!$existingDraftOrder) {
            $existingDraftOrder = OrderCreateDraftAction::run([
                'locationId' => $location->id,
                'location' => $location,
            ]);
        }
        $orderFood = null;

        $orderItems = $existingDraftOrder->order_items;
        if (isset($orderItems[$foodId])) {
            if ($quantity < 1) {
                unset($orderItems[$foodId]);
            } else {
                $orderItems[$foodId]['quantity'] = $quantity;
            }
            $existingDraftOrder->order_items = $orderItems;
            $existingDraftOrder->save();

            return true;
        }


        $location = FeGetOneLocation::run([
            'citySlug' => $citySlug,
            'slug' => $slug,
            'withMenu' => true,
        ]);
        if ($location->restaurant_menu) {
            foreach ($location->restaurant_menu as $restaurantMenu) {
                $restaurantMenu->food_categories->first(function ($foodCategory) use ($foodId, &$orderFood) {
                    $foodCategory->foods->first(function ($food) use ($foodId, &$orderFood) {
                        if ($food->id === $foodId) {
                            $orderFood = $food;
                        }
                    });
                });
            }
        }

        if (!$orderFood) {
            throw new Exception('Food not found');
        }

        $orderItems[$foodId] = [
            'food_id' => $foodId,
            'food_category_id' => $foodCategoryId,
            'quantity' => $quantity,
            'price' => $orderFood->price,
            'name' => $orderFood->name,
            'title' => $orderFood->title,
        ];
        $existingDraftOrder->order_items = $orderItems;
        $existingDraftOrder->save();

        return true;
    }
}
