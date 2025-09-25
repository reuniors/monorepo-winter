<?php
namespace Reuniors\Reservations\Http\ActionsFe;

use Carbon\Carbon;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\News;

class FeGetActiveNewsAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
            'type' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $locationSlug = $attributes['locationSlug'];
        $type = $attributes['type'] ?? 'chyron';
        $status = $attributes['status'] ?? 'approved';

        // Get location
        $location = Location::where('slug', $locationSlug)->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }

        $now = Carbon::now()->toDateTimeString();

        // Get active news (chyron type) for this location
        $activeNews = News::where('location_id', $location->id)
            ->where('status', $status)
            ->where('type', $type)
            ->whereDate('activated_at', '<=', $now)
            ->whereDate('deactivated_at', '>=', $now)
            ->orderBy('level', 'desc')
            ->orderBy('created_at', 'desc')
            ->get(['id', 'title', 'description', 'level', 'type', 'status']);

        return $activeNews;
    }
}
