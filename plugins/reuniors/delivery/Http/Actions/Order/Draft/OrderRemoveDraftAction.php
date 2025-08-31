<?php namespace Reuniors\Delivery\Http\Actions\Order\Draft;

use Auth;
use Exception;
use Reuniors\Delivery\Http\Enum\OrderStatusEnum;
use Reuniors\Delivery\Models\Order;
use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\FeGetOneLocation;

class OrderRemoveDraftAction extends BaseAction
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
            $existingDraftOrder->delete();
        }

        return true;
    }
}
