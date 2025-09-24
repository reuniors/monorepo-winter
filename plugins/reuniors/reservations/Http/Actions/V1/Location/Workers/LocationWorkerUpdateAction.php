<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;

class LocationWorkerUpdateAction extends BaseAction
{
    public function rules()
    {
        return [
            'id' => ['required', 'integer'],
            'locationSlug' => ['required', 'string'],
            'first_name' => ['sometimes', 'string', 'max:255'],
            'last_name' => ['sometimes', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'active' => ['nullable', 'boolean'],
            'status' => ['nullable', 'integer'],
            'user_id' => ['nullable', 'integer'],
            'phone_data' => ['nullable', 'array'],
            // Add other fields as needed
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }

        $worker = LocationWorker::find($attributes['id']);
        if (!$worker) {
            throw new \Exception('Worker not found');
        }

        $worker->fill($attributes);
        $worker->save();

        // Ensure attached to location
        if (!$location->workers()->where('location_worker_id', $worker->id)->exists()) {
            $location->workers()->attach($worker->id);
        }

        return $worker->fresh();
    }
} 