<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location\User\Like;

use Auth;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;

class FeUserLikeLocationAction extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string', 'required'],
            'slug' => ['string', 'required'],
            'like' => ['boolean', 'required'],
        ];
    }

    private function getLocation($slug, $citySlug)
    {
        return Location::query()
            ->where('slug', $slug)
            ->whereHas('city', function ($query) use ($citySlug) {
                $query->where('slug', $citySlug);
            })
            ->firstOrFail();
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        $citySlug = $attributes['citySlug'] ?? null;
        $slug = $attributes['slug'];
        $isLiked = $attributes['like'];

        $location = $this->getLocation($slug, $citySlug);

        $existingLike = $location->likes_history()
            ->where('user_id', $user->id)
            ->first();
        if ($isLiked) {
            !$existingLike && $location->likes_history()->create([
                'user_id' => $user->id,
                'city_id' => $location->city_id,
            ]);
        } else {
            $existingLike && $existingLike->delete();
        }

        return $this->getLocation($slug, $citySlug)->likes_count ?? 0;
    }
}
