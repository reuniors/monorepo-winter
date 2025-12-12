<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\ServiceCategories;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\ServiceCategory;
use Reuniors\Reservations\Models\Location;
use Illuminate\Support\Str;

class ServiceCategoryCreateAction extends BaseAction
{
    public function rules()
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'active' => ['nullable', 'boolean'],
            'sortOrder' => ['nullable', 'integer', 'min:0'],
            'locationSlug' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])->firstOrFail();

        // Generate slug if not provided
        if (empty($attributes['slug'])) {
            $attributes['slug'] = Str::slug($attributes['title']);
        }

        // Ensure slug is unique
        $baseSlug = $attributes['slug'];
        $counter = 1;
        while (ServiceCategory::where('slug', $attributes['slug'])
            ->where('location_id', $location->id)
            ->exists()) {
            $attributes['slug'] = $baseSlug . '-' . $counter;
            $counter++;
        }

        $serviceCategory = new ServiceCategory();
        $serviceCategory->location_id = $location->id;
        $serviceCategory->title = $attributes['title'];
        $serviceCategory->slug = $attributes['slug'];
        $serviceCategory->description = $attributes['description'] ?? null;
        $serviceCategory->active = $attributes['active'] ?? true;
        $serviceCategory->sort_order = $attributes['sortOrder'] ?? 0;
        $serviceCategory->save();

        // Load service groups relationship (empty initially)
        $serviceCategory->load('serviceGroups');

        return $serviceCategory;
    }
}

