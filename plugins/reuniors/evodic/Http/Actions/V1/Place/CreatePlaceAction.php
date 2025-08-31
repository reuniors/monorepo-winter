<?php namespace Reuniors\Evodic\Http\Actions\V1\Place;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Classes\Helpers\S;
use reuniors\evodic\Enums\PlaceStatus;
use Reuniors\Evodic\Models\Place;

class CreatePlaceAction
{
    use asAction;

    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.title' => ['required', 'string'],
            'data.city_id' => 'required',
            'data.description' => 'string',
            'data.place_type_id' => 'required',
        ];
    }

    public function handle(array $attributes = [])
    {
        $data = $attributes['data'];
        $placeTypeId = $data['place_type_id'];
        $cityId = $data['city_id'];

        $newPlace = Place::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'name' => S::camel($data['title']),
            'slug' => S::slug($data['title']),
            'is_active' => true,
            'place_type_id' => $placeTypeId,
            'city_id' => $cityId,
            'status' => PlaceStatus::DRAFT,
            'address_data' => [
                'street' => '',
                'street_number' => '',
                'zip' => '',
                'municipality' => '',
            ],
            'phone_data' => [
                'phone_numbers' => [],
                'delivery_phone_numbers' => [],
                'delivery_show_number' => false,
            ],
        ]);

        return [
            'success' => true,
            'data' => $newPlace
        ];
    }

    public function asController(Request $request)
    {
        $requestData = $request->all();
        return $this->handle($requestData);
    }
}
