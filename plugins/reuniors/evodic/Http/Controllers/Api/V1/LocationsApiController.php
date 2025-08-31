<?php namespace Reuniors\Evodic\Http\Controllers\Api\V1;

use Reuniors\Evodic\Http\Requests\LocationRequest;
use Reuniors\Evodic\Models\Location;
use Backend\Classes\Controller;

class LocationsApiController extends Controller
{
    public $implement = [
        'Reuniors.Evodic.Classes.Behavior.RestControllerExtended'
    ];

    public $restConfig = 'config_rest.yaml';

//    public function show($id)
//    {
//        // Replace with logic to return the model data
//        $locationData = Location::where('id', $id)->firstOrFail();
//        return response()->json($locationData->attributesToArray());
//    }

//    public function store(LocationRequest $request)
//    {
//        try {
//            var_dump(2);
//            $validatedData = $request->validated();
//            $newLocation = Location::createNew($request->all());
//            return response()->json($newLocation->attributesToArray());
//        } catch (\Exception $exception) {
//            var_dump(1);
//            die;
//        }
//    }
}
