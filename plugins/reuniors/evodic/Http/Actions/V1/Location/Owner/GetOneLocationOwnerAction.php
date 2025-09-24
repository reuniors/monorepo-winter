<?php namespace Reuniors\Evodic\Http\Actions\V1\Location\Owner;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\LocationOwner;

class GetOneLocationOwnerAction extends BaseAction
{

    public function rules()
    {
        return [];
    }

    public function handle(LocationOwner $locationOwner)
    {
        $locationOwner->load(['city', 'city.country']);
        return [
            'success' => true,
            'data' => $locationOwner
        ];
    }

    public function asController(Request $request, LocationOwner $locationOwner)
    {
        return $this->handle($locationOwner);
    }
}
