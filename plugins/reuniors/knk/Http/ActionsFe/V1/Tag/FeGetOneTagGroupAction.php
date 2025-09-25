<?php

namespace Reuniors\Knk\Http\ActionsFe\V1\Tag;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\TagGroup;

class FeGetOneTagGroupAction extends BaseAction
{
    public function rules()
    {
        return [
            'name' => 'string',
            'id' => 'integer',
        ];
    }

    public function handle(array $attributes = [])
    {
        $name = $attributes['name'];
        $id = $attributes['id'];

        $tagGroups = FeGetTagGroupsAction::run();
        return $tagGroups->first(function ($tagGroup) use ($name, $id) {
            if ($name && $id) {
                return $tagGroup->name === $name || $tagGroup->id === $id;
            } elseif ($name) {
                return $tagGroup->name === $name;
            } elseif ($id) {
                return $tagGroup->id === $id;
            }
            return false;
        });
    }
}
