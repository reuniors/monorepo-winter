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

    public function handle(array $attributes = [], Place $place = null)
    {
        $place->delete();

        return true;
    }

    public function asController(Place $place = null): array
    {
        return parent::asController($place);
    }
}
