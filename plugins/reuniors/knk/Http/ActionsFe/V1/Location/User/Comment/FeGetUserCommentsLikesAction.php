<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location\User\Comment;

use Auth;
use Reuniors\Comments\Models\CommentsLikesHistory;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;

class FeGetUserCommentsLikesAction extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string', 'required'],
            'slug' => ['string', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $citySlug = $attributes['citySlug'];
        $slug = $attributes['slug'];
        $user = Auth::getUser();

        $location = Location::getFE([
            'citySlug' => $citySlug,
            'slug' => $slug,
        ])->firstOrFail();

        return CommentsLikesHistory::query()
            ->whereHas('comment.location', function ($query) use ($location) {
                $query->where('id', $location->id);
            })
            ->where('user_id', $user->id)
            ->get();
    }
}
