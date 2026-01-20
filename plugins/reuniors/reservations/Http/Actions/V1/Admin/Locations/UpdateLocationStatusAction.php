<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Locations;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Carbon\Carbon;

class UpdateLocationStatusAction extends BaseAction
{
    use AsAction;

    public function handle(array $attributes = [])
    {
        $id = $attributes['id'] ?? null;
        $active = $attributes['active'] ?? null;
        $reason = $attributes['reason'] ?? null;

        if (!$id) {
            throw new \Exception('Location ID is required');
        }

        $location = Location::findOrFail($id);
        
        $location->active = $active;
        
        if ($active) {
            $location->active_at = Carbon::now();
            $location->deactivate_at = null;
        } else {
            $location->deactivate_at = Carbon::now();
        }
        
        // Optionally store reason in metadata
        if ($reason) {
            $metadata = $location->metadata ?? [];
            $metadata['last_status_change'] = [
                'reason' => $reason,
                'changed_at' => Carbon::now()->toIso8601String(),
                'active' => $active,
            ];
            $location->metadata = $metadata;
        }
        
        $location->save();

        return $location->fresh(['city']);
    }
}
