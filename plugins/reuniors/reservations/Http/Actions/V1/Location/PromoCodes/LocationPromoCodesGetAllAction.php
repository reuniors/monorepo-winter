<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\PromoCodes;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\PromoCode;

class LocationPromoCodesGetAllAction extends BaseAction
{
    use AsAction;

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