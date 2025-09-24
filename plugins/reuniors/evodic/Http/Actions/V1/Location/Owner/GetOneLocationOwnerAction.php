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

    public function handle(array $attributes = [], LocationOwner $locationOwner = null)
    {
        $locationOwner->load(['city', 'city.country']);
        return $locationOwner;
    }

    public function asController(LocationOwner $locationOwner = null): array
    {
        return parent::asController($locationOwner);
    }
}
