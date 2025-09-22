<?php namespace Reuniors\Knk\Http\Actions\V1\Tag\Group;

use Illuminate\Http\Request;
use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Base\Models\TagGroup;

class GetTagGroupTypesAction extends BaseAction
{
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [])
    {
        return TagGroup::TYPES;
    }
}
