<?php namespace reuniors\evodic\Http\Actions\V1\Place;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Place;

class DeletePlaceAction extends BaseAction
{

    public function rules()
    {
        return [];
    }

    public function handle(Place $place)
    {
        $place->delete();

        return [
            'success' => true,
        ];
    }

    public function asController(Request $request, Place $place)
    {
        return $this->handle($place);
    }
}
