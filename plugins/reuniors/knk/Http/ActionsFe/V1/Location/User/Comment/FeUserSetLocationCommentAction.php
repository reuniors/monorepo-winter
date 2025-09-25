<?php

namespace Reuniors\Knk\Http\ActionsFe\V1\Location\User\Comment;

use Auth;
use Reuniors\Comments\Models\Comments;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;

class FeUserSetLocationCommentAction extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string', 'required'],
            'slug' => ['string', 'required'],
            'comment' => ['string', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $userData = Auth::getUser();
        $citySlug = $attributes['citySlug'];
        $slug = $attributes['slug'];
        $commentText = $attributes['comment'];

        $location = Location
            ::getFE([
                'citySlug' => $citySlug,
                'slug' => $slug,
            ])
            ->firstOrFail();
        $comment = $location->comments()
            ->where('user_id', $userData->id)
            ->first();

        if (!$comment) {
            $comment = new Comments();
            $comment->user_id = $userData->id;
            $comment->attachment_id = $location->id;
            $comment->attachment_field = 'location';
            $comment->url = '';
            $comment->status = Comments::STATUS_PENDING;
        }
        if ($commentText !== '__empty__') {
            $comment->content = $commentText;
            $comment->status = Comments::STATUS_PENDING;
        } elseif (!$comment->content) {
            $comment->content = '';
        }
        $comment->status = $comment->status ?? Comments::STATUS_PENDING;

        $comment->forceSave();
    }
}
