<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\PromoCodes;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\PromoCode;

class LocationPromoCodeUpdateAction extends BaseAction
{
    public function rules()
    {
        return [
            'id' => ['required', 'integer'],
            'locationSlug' => ['required', 'string'],
            'name' => ['sometimes', 'string', 'max:100'],
            'discount_value' => ['sometimes', 'numeric', 'min:0'],
            'in_percent' => ['sometimes', 'boolean'],
            'activate_at_utc' => ['sometimes', 'date'],
            'deactivate_at_utc' => ['sometimes', 'date', 'after:activate_at_utc'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }

        $promoCode = PromoCode::find($attributes['id']);
        if (!$promoCode) {
            throw new \Exception('Promo code not found');
        }

        // Check if promo code belongs to this location
        if ($promoCode->location_id !== $location->id) {
            throw new \Exception('Promo code does not belong to this location');
        }

        $promoCode->fill($attributes);
        $promoCode->save();

        return $promoCode->fresh();
    }
} 