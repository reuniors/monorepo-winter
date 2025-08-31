<?php namespace Reuniors\Evodic\Http\Actions\V1\Country;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\Country;

class GetCountriesAction
{
    use asAction;

    public function handle(array $attributes = [])
    {
        return [
            'success' => true,
            'data' => Country::get()
        ];
    }

    public function asController()
    {
        $requestData = request()->all();
        return $this->handle($requestData);
    }
}
