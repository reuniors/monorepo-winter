<?php namespace Reuniors\Evodic\Http\Actions\V1\Tag\Group;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\TagGroup;

class GetOneTagGroupAction extends BaseAction
{

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
