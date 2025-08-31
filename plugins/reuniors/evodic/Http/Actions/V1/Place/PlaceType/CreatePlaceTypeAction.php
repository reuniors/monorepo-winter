<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\PlaceType;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Classes\Helpers\S;
use Reuniors\Evodic\Models\PlaceType;

class CreatePlaceTypeAction
{
    use asAction;

    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.title' => ['required', 'string'],
            'data.category_code' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $data = $attributes['data'];

        $data['name'] = S::camel($data['title']);
        $data['is_active'] = true;

        $placeType = PlaceType::create($data);

        return [
            'success' => true,
            'data' => $placeType
        ];
    }

    public function asController(Request $request)
    {
        $requestData = $request->all();
        return $this->handle($requestData);
    }
}
