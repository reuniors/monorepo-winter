<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location\RestaurantMenu\Food\User;

use Reuniors\Base\Http\Actions\BaseAction;
use Auth;
use Reuniors\Knk\Models\Food;

class FeUserLikeFoodAction extends BaseAction
{
    public function rules()
    {
        return [
            'foodId' => ['integer', 'required'],
            'like' => ['boolean', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        $foodId = $attributes['foodId'];
        $isLiked = $attributes['like'];

        $food = Food::query()
            ->where('id', $foodId)
            ->firstOrFail();

        $existingLike = $food->likes_history()
            ->where('user_id', $user->id)
            ->first();

        if ($isLiked && !$existingLike) {
            $food->likes_history()->create([
                'user_id' => $user->id,
            ]);
            $food->like_count += 1;
        } elseif(!$isLiked && $existingLike) {
            $existingLike->delete();
            $food->like_count -= 1;
        }

        return $food;
    }
}
