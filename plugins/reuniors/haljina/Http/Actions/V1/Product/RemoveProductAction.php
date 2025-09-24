<?php namespace Reuniors\Haljina\Http\Actions\V1\Product;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Haljina\Models\Product;
use Auth;

class RemoveProductAction extends BaseAction
{
    public function rules()
    {
        return [
            'id' => ['required'],
        ];
    }

    public function handle($attributes = [])
    {
        Product::deleteProduct([
            'id' => $attributes['id'],
        ]);

        return [
            'success' => true,
        ];
    }

    public function asController()
    {
        $requestData = request()->all();
        return $this->handle($requestData);
    }
}
