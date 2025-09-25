<?php namespace Reuniors\Haljina\Http\Actions\V1\ProductSize;

use Auth;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Haljina\Classes\Helpers\S;
use Reuniors\Haljina\Models\ProductSize;

class CreateProductSize extends BaseAction
{

    public function rules()
    {
        return [
            'title' => ['required', 'string'],
            'active' => ['required','boolean'],
        ];
    }

    public function handle(array $data = [])
    {
        $usedData = Auth::getUser();
        $data['user_id'] = $usedData->id;
        $data['name'] = S::camel($data['title']);
        return ProductSize::create($data);
    }
}
