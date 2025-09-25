<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location\Comment;

use Reuniors\Comments\Models\Comments;
use Reuniors\Base\Http\Actions\BaseAction;
use Auth;

class FeUserLikeCommentAction extends BaseAction
{
    public function rules()
    {
        return [
            'commentId' => ['integer', 'required'],
            'like' => ['boolean', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        $commentId = $attributes['commentId'];
        $isLiked = $attributes['like'];

        $comment = Comments::query()
            ->where('id', $commentId)
            ->firstOrFail();

        $existingLike = $comment->likes_history()
            ->where('user_id', $user->id)
            ->first();

        if ($isLiked && !$existingLike) {
            $comment->likes_history()->create([
                'user_id' => $user->id,
            ]);
        } elseif(!$isLiked && $existingLike) {
            $existingLike->delete();
        }

        return $comment;
    }
}
