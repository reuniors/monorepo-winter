<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;

class LocationWorkerCreateAction extends BaseAction
{
    use AsAction;

    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
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

        $worker = new LocationWorker();
        $worker->fill($attributes);
        $worker->save();

        // Attach to location
        $location->workers()->attach($worker->id);

        return $worker->fresh();
    }
} 