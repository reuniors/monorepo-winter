<?php namespace Reuniors\Evodic\Http\Actions\V1\Location;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Location;
use Auth;
use Winter\Storm\Support\Facades\DB;

class GetLocationsAction extends BaseAction {
    
    const PER_PAGE = 10;

    public function rules()
    {
        return [
            'ownerId' => ['integer']
        ];
    }

    public function handle($filters = [])
    {
        $ownerId = $filters['ownerId'] ?? null;

        $locationQuery = Location::query();

        if ($ownerId) {
            $locationQuery->whereHas('location_owners', function ($query) use ($ownerId) {
                $query->where('id', $ownerId);
            });
        }
        /**
         * @var $perPage
         */
        extract(array_merge([
            'perPage' => self::PER_PAGE,
        ], $filters));

        return $locationQuery->paginate($perPage);
    }
}
