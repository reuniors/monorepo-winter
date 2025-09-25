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

        return LocationOwner::paginate($perPage);
    }
}
