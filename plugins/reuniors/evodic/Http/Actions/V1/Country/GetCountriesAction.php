<?php namespace Reuniors\Evodic\Http\Actions\V1\Country;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\Country;

class GetCountriesAction extends BaseAction
{

    public function handle(array $attributes = [])
    {
        return [
            'success' => true,
            'data' => Country::get()
        ];
    }

}
