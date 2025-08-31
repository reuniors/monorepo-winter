<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Story;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Story;

class FeDeleteStoryAction extends BaseAction
{
    public function rules()
    {
        return [
            'id' => ['required', 'integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $storyId = $attributes['storyId'];
        $userId = $attributes['userId'] ?? null;

        $story = Story::find($storyId);

        if ($story) {
            $story->delete();
        }

        return true;
    }
}
