<?php namespace Reuniors\Evodic\Http\Actions\V1\Location\Owner;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\LocationOwner;

class UpdateLocationOwnerAction extends BaseAction
{

    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.first_name' => 'string',
            'data.last_name' => 'string',
            'data.city_id' => 'required',
        ];
    }

    public function handle(array $attributes = [], LocationOwner $locationOwner = null)
    {
        $data = $attributes['data'];

        $locationOwner->update($data);

        return $locationOwner;
    }

    public function asController(LocationOwner $locationOwner = null): array
    {
        return parent::asController($locationOwner);
    }
}
