<?php namespace Reuniors\Delivery\Http\Actions\Order\Draft;

use Auth;
use Exception;
use Reuniors\Delivery\Http\Enum\OrderStatusEnum;
use Reuniors\Delivery\Models\Order;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\FeGetOneLocation;

class OrderCreateDraftAction extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string'],
            'slug' => ['string'],
            'locationId' => ['integer'],
            'location' => ['object'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $userData = Auth::getUser();
        $citySlug = $attributes['citySlug'] ?? null;
        $slug = $attributes['slug'] ?? null;
        $locationId = $attributes['locationId'] ?? null;
        $location = $attributes['location'] ?? null;

        if (!$locationId && (!$citySlug || !$slug)) {
            throw new Exception('Invalid parameters');
        }

        if (!$locationId || !$location) {
            $location = FeGetOneLocation::run([
                'citySlug' => $citySlug,
                'slug' => $slug,
            ]);
            $locationId = $location->id;
        }

        $existingDraftOrder = OrderFindDraftAction::run([
            'locationId' => $locationId,
        ]);
        if ($existingDraftOrder) {
            return $existingDraftOrder;
        }

        $order = new Order();
        $order->status = OrderStatusEnum::DRAFT;
        $order->location_id = $location->id;
        $order->user_id = $userData->id;
        $order->location_data = [
            'name' => $location->name,
            'slug' => $location->slug,
            'city_slug' => $location->city_slug,
            'address_data' => $location->address_data,
            'phone_data' => $location->phone_data,
        ];
        $order->order_items = [];
        $order->price = 0;
        $order->original_price = 0;
        $order->promo_code = '';
        $order->save();

        return $order;
    }
}
