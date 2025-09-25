<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Services\Service;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Service;
use Illuminate\Support\Str;

class ServiceCreateAction extends BaseAction
{
    public function rules()
    {
        return [
            'group_id' => ['required', 'integer', 'exists:reuniors_reservations_services_groups,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'name' => ['nullable', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255'],
            'active' => ['nullable', 'boolean'],
            'duration' => ['nullable', 'integer', 'min:0'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'currency' => ['nullable', 'integer', 'in:0,1'],
        ];
    }

    public function handle(array $attributes = [])
    {
        unset($attributes['sort_order']);
        $attributes['name'] = Str::camel($attributes['title']);
        $service = new Service();
        $service->fill($attributes);
        $service->save();
        return $service;
    }
} 