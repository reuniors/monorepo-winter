<?php namespace Reuniors\Knk\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LocationRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => 'required|unique:locations|max:255',
            'name' => 'required|unique:locations|max:255',
            'slug' => 'required|unique:locations|max:255',
            'text' => 'string|max:25555',
            'activation_at' => 'date',
            'deactivation_at' => 'date',
            'metadata' => 'array',
            'snippet' => 'string|max:1000',
            'city_id' => 'integer',
            'is_child' => 'integer',
            'parent_id' => 'integer|nullable',
            'address_data' => 'array',
            'phone_data' => 'array',
            'working_hours_data' => 'array',
            'delivery_working_hours_data' => 'array',
            'other_info' => 'array',
            'show_on_home' => 'boolean',
            'show_on_home_global' => 'boolean',
            'has_delivery' => 'boolean',
            'has_online_delivery' => 'boolean',
            'average_price' => 'numeric',
            'average_price_for_two' => 'numeric',
            'delivery_url_path' => 'string|max:1000',
            'badge_tag_group_id' => 'integer',
            'address_lat' => 'numeric',
            'address_long' => 'numeric',
            'closed_from_at' => 'date',
            'closed_to_at' => 'date',
            'is_closed' => 'boolean',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
