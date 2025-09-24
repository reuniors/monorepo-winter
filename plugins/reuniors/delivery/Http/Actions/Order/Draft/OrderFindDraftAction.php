<?php namespace Reuniors\Delivery\Http\Actions\Order\Draft;

use Auth;
use Exception;
use Reuniors\Delivery\Http\Enum\OrderStatusEnum;
use Reuniors\Delivery\Models\Order;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\FeGetOneLocation;

class OrderFindDraftAction extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string'],
            'slug' => ['string'],
            'locationId' => ['integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $userData = Auth::getUser();
        $citySlug = $attributes['citySlug'] ?? null;
        $slug = $attributes['slug'] ?? null;
        $locationId = $attributes['locationId'] ?? null;

        if (!$locationId && (!$citySlug || !$slug)) {
            throw new Exception('Invalid parameters');
        }
        if (!$locationId) {
            $location = FeGetOneLocation::run([
                'citySlug' => $citySlug,
                'slug' => $slug,
            ]);
            $locationId = $location->id;
        }

        $existingDraftOrder = Order::query()
            ->where('user_id', $userData->id)
            ->where('status', OrderStatusEnum::DRAFT)
            ->where('location_id', $locationId)
            ->first();

        if ($existingDraftOrder) {
            return $existingDraftOrder;
        }

        return null;
    }
}
