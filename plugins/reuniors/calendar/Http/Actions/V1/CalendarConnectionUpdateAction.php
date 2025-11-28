<?php namespace Reuniors\Calendar\Http\Actions\V1;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Calendar\Models\CalendarConnection;

class CalendarConnectionUpdateAction extends BaseAction
{
    public function rules()
    {
        return [
            'connectionId' => 'required|integer|exists:reuniors_calendar_connections,id',
            'sync_to_provider' => 'boolean',
            'sync_from_provider' => 'boolean',
            'block_overlapping_slots' => 'boolean',
            'allow_overlapping_with_approval' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function handle(array $attributes = [])
    {
        $connection = CalendarConnection::findOrFail($attributes['connectionId']);

        if (isset($attributes['sync_to_provider'])) {
            $connection->sync_to_provider = $attributes['sync_to_provider'];
        }
        if (isset($attributes['sync_from_provider'])) {
            $connection->sync_from_provider = $attributes['sync_from_provider'];
        }
        if (isset($attributes['block_overlapping_slots'])) {
            $connection->block_overlapping_slots = $attributes['block_overlapping_slots'];
        }
        if (isset($attributes['allow_overlapping_with_approval'])) {
            $connection->allow_overlapping_with_approval = $attributes['allow_overlapping_with_approval'];
        }
        if (isset($attributes['is_active'])) {
            $connection->is_active = $attributes['is_active'];
        }

        $connection->save();

        return [
            'success' => true,
            'message' => 'Connection updated successfully',
            'connection' => [
                'id' => $connection->id,
                'is_active' => $connection->is_active,
                'sync_to_provider' => $connection->sync_to_provider,
                'sync_from_provider' => $connection->sync_from_provider,
                'block_overlapping_slots' => $connection->block_overlapping_slots,
                'allow_overlapping_with_approval' => $connection->allow_overlapping_with_approval,
            ],
        ];
    }
}

