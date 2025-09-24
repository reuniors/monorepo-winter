<?php namespace Reuniors\Evodic\Http\Actions\V1\Location\Owner;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Auth;
use Reuniors\Evodic\Models\LocationOwner;

class GetLocationOwnersAction extends BaseAction {
    
    const PER_PAGE = 10;

    public function handle($filters = [])
    {
        /**
         * @var $perPage
         */
        extract(array_merge([
            'perPage' => self::PER_PAGE,
        ], $filters));

        return [
            'success' => true,
            'data' => LocationOwner::paginate($perPage)
        ];
    }

    public function asController(Request $request)
    {
        return $this->handle(
            request()->all()
        );
    }

    public function jsonResponse($response)
    {
        return response()->json(
            $response
        );
    }
}
