<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Services\Group;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\ServiceGroup;
use Illuminate\Support\Str;
use Reuniors\Reservations\Models\Location;

class ServiceGroupCreateAction extends BaseAction
{
    use AsAction;

    public function rules()
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'active' => ['nullable', 'boolean'],
            'type' => ['nullable', 'integer'],
            'required' => ['nullable', 'boolean'],
            'min_selected' => ['nullable', 'integer', 'min:0'],
            'max_selected' => ['nullable', 'integer', 'min:0'],
            'locationSlug' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])->firstOrFail();

        unset($attributes['sort_order']);
        $attributes['name'] = Str::camel($attributes['title']);
        $serviceGroup = new ServiceGroup();
        $serviceGroup->fill($attributes);
        $serviceGroup->save();

        $serviceGroup->locations()->attach($location->id);

        return $serviceGroup;
    }
} 