<?php namespace Reuniors\Evodic\Http\Actions\V1\Tag\Group;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\TagGroup;

class GetOneTagGroupAction
{
    use asAction;

    public function rules()
    {
        return [];
    }

    public function handle(TagGroup $tagGroup)
    {
        return [
            'success' => true,
            'data' => $tagGroup
        ];
    }

    public function asController(Request $request, TagGroup $tagGroup)
    {
        return $this->handle($tagGroup);
    }
}
