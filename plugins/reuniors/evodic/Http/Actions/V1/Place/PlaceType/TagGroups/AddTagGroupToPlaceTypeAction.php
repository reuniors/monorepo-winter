<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\PlaceType\TagGroups;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\PlaceType;
use Reuniors\Base\Models\TagGroup;
use Illuminate\Http\Request;

class AddTagGroupToPlaceTypeAction
{
    use AsAction;

    public function rules()
    {
        return [];
    }

    public function handle(array $attributes, PlaceType $placeType, TagGroup $tagGroup)
    {
        $placeType->tagGroups()->attach($tagGroup);

        return $tagGroup;
    }

    public function asController(Request $request, PlaceType $placeType, TagGroup $tagGroup)
    {
        $requestData = $request->all();

        return [
            'data' => $this->handle($requestData, $placeType, $tagGroup),
            'success' => true
        ];
    }
}
