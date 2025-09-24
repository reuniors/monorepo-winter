<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\PromoCodes;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\PromoCode;

class LocationPromoCodeCreateAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
            'name' => ['required', 'string', 'max:100'],
            'discount_value' => ['required', 'numeric', 'min:0'],
            'in_percent' => ['required', 'boolean'],
            'activate_at' => ['required', 'date'],
            'deactivate_at' => ['required', 'date', 'after:activate_at'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }

        $promoCode = new PromoCode();
        $promoCode->fill($attributes);
        $promoCode->location_id = $location->id;
        $promoCode->save();

        return $promoCode->fresh();
    }
} 