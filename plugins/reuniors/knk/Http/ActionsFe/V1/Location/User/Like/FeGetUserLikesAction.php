<?php

namespace Reuniors\Knk\Http\ActionsFe\V1\Location\User\Like;

use Auth;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Http\ActionsFe\V1\City\FeGetCityData;
use Reuniors\Knk\Models\LocationLikesHistory;

class FeGetUserLikesAction extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $citySlug = $attributes['citySlug'] ?? null;
        $city = $citySlug ? FeGetCityData::run(['citySlug' => $citySlug]) : null;
        $userData = Auth::getUser();
        $userLocationLikesQuery = LocationLikesHistory::query();
        $userLocationLikesQuery->where('user_id', $userData->id);
        if ($city) {
            $userLocationLikesQuery->whereHas('location', function ($query) use ($city) {
                $query->where('city_id', $city['id']);
            });
        }
        return $userLocationLikesQuery->get();
    }
}
