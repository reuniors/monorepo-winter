<?php namespace Reuniors\Knk\Http\Actions\V1\Tag\Group;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Base\Models\TagGroup;

class DeleteTagGroupAction extends BaseAction
{
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], TagGroup $tagGroup = null)
    {
        $tagGroup->delete();

        return true;
    }

    public function asController(TagGroup $tagGroup = null): array
    {
        return parent::asController($tagGroup);
    }
}
