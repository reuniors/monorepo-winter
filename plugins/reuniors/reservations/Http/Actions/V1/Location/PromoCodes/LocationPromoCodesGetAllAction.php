<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\PromoCodes;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\PromoCode;

class LocationPromoCodesGetAllAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $locationSlug = $attributes['locationSlug'];
        $location = Location::where('slug', $locationSlug)->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }
        
        $promoCodes = PromoCode::where('location_id', $location->id)
            ->orderBy('created_at', 'desc')
            ->paginate(1000);
        
        return $promoCodes;
    }
} 