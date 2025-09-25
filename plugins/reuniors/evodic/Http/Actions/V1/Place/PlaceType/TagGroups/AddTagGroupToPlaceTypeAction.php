<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\PlaceType\TagGroups;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\PlaceType;
use Reuniors\Base\Models\TagGroup;

class AddTagGroupToPlaceTypeAction extends BaseAction {
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], PlaceType $placeType = null, TagGroup $tagGroup = null)
    {
        $placeType->tagGroups()->attach($tagGroup);

        return $tagGroup;
    }

    public function asController(PlaceType $placeType = null, TagGroup $tagGroup = null): array
    {
        return parent::asController($placeType, $tagGroup);
    }
}
