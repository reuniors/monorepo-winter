<?php namespace Reuniors\Evodic\Http\Actions\V1\Location\Owner;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\LocationOwner;

class DeleteLocationOwnerAction
{
    use asAction;

    public function rules()
    {
        return [];
    }

    public function handle(LocationOwner $locationOwner)
    {
        $locationOwner->delete();

        return [
            'success' => true,
        ];
    }

    public function asController(Request $request, LocationOwner $locationOwner)
    {
        return $this->handle($locationOwner);
    }
}
