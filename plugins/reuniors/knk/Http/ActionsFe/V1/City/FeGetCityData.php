<?php

namespace Reuniors\Knk\Http\ActionsFe\V1\City;

use Reuniors\Knk\Http\Actions\BaseAction;

class FeGetCityData extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string', 'required'],
            'cityId' => ['numeric', 'required'],
            'parentId' => 'integer',
        ];
    }

    public function handle(array $attributes = [])
    {
        $cities = FeGetCitiesAction::run(['onlyConnected' => true]);
        return current(array_filter($cities, function ($city) use ($attributes) {
            if (isset($attributes['cityId'])) {
                return $city['id'] === $attributes['cityId'];
            }
            if (isset($attributes['parentId'])) {
                return $city['parent_id'] === $attributes['parentId'];
            }
            return $city['slug'] === $attributes['citySlug'];
        }));
    }
}
