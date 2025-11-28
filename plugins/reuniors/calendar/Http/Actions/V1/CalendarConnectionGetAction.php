<?php namespace Reuniors\Calendar\Http\Actions\V1;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Calendar\Models\CalendarConnection;

class CalendarConnectionGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'provider' => 'in:google',
            'locationId' => 'integer|nullable',
            'locationWorkerId' => 'integer|nullable',
        ];
    }

    public function handle(array $attributes = [])
    {
        $provider = $attributes['provider'] ?? null;
        $locationId = $attributes['locationId'] ?? null;
        $locationWorkerId = $attributes['locationWorkerId'] ?? null;

        $query = CalendarConnection::active();

        if ($provider) {
            $query->provider($provider);
        }

        if (($locationId || $locationWorkerId) && class_exists('Reuniors\\Reservations\\Models\\ReservationCalendarConnection')) {
            $query->whereHas('reservationsConnections', function($q) use ($locationId, $locationWorkerId) {
                if ($locationId) {
                    $q->where('location_id', $locationId);
                }
                if ($locationWorkerId) {
                    $q->where('location_worker_id', $locationWorkerId);
                }
            });
        }

        $connection = $query->first();

        if (!$connection) {
            return [
                'connected' => false,
            ];
        }

        return [
            'connected' => true,
            'connection' => [
                'id' => $connection->id,
                'provider' => $connection->provider,
                'provider_email' => $connection->provider_email,
                'is_active' => $connection->is_active,
                'sync_to_provider' => $connection->sync_to_provider,
                'sync_from_provider' => $connection->sync_from_provider,
                'block_overlapping_slots' => $connection->block_overlapping_slots,
                'allow_overlapping_with_approval' => $connection->allow_overlapping_with_approval,
            ],
        ];
    }
}
