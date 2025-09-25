<?php namespace Reuniors\Evodic\Http\Actions\V1\Tag\Group;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\TagGroup;

class DeleteTagGroupAction extends BaseAction
{

    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], TagGroup $tagGroup = null): array
    {
        $tagGroup->delete();

        return true;
    }

    public function asController(TagGroup $tagGroup = null): array
    {
        return parent::asController($tagGroup);
    }
}
