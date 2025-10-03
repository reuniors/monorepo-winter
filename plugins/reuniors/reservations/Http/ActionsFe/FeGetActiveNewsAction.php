<?php
namespace Reuniors\Reservations\Http\ActionsFe;

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

        $nowUtc = now()->utc();

        // Get active news (chyron type) for this location using UTC fields
        $activeNews = News::where('location_id', $location->id)
            ->where('status', $status)
            ->where('type', $type)
            ->where(function ($query) use ($nowUtc) {
                $query->whereNull('activated_at_utc')
                      ->orWhere('activated_at_utc', '<=', $nowUtc);
            })
            ->where(function ($query) use ($nowUtc) {
                $query->whereNull('deactivated_at_utc')
                      ->orWhere('deactivated_at_utc', '>=', $nowUtc);
            })
            ->orderBy('level', 'desc')
            ->orderBy('created_at', 'desc')
            ->get(['id', 'title', 'description', 'level', 'type', 'status']);

        return $activeNews;
    }
}
