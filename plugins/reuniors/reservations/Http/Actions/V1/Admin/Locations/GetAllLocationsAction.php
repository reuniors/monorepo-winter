<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Locations;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;

/**
 * GetAllLocationsAction
 * 
 * Returns paginated list of ALL RZR locations
 * Admin-only endpoint for managing platform-wide locations
 */
class GetAllLocationsAction extends BaseAction
{
    use AsAction;

    public function handle(array $attributes = [])
    {
        $search = $attributes['search'] ?? '';
        $perPage = $attributes['perPage'] ?? 20;
        $page = $attributes['page'] ?? 1;
        $active = isset($attributes['active']) ? filter_var($attributes['active'], FILTER_VALIDATE_BOOLEAN) : null;
        $type = $attributes['type'] ?? null;
        $cityId = $attributes['cityId'] ?? null;

        $query = Location::query()
            ->with(['city'])
            ->withCount(['workers', 'services_groups']);

        // Search filter
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('slug', 'like', "%$search%")
                  ->orWhere('title', 'like', "%$search%");
            });
        }

        // Active filter
        if ($active !== null) {
            $query->where('active', $active);
        }

        // Type filter
        if ($type) {
            $query->where('type', $type);
        }

        // City filter
        if ($cityId) {
            $query->where('city_id', $cityId);
        }

        $query->orderBy('created_at', 'desc');

        $locations = $query->paginate($perPage, ['*'], 'page', $page);

        return [
            'data' => $locations->items(),
            'current_page' => $locations->currentPage(),
            'lastPage' => $locations->lastPage(),
            'per_page' => $locations->perPage(),
            'total' => $locations->total(),
        ];
    }
}
