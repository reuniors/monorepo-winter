<?php namespace Reuniors\Haljina\Http\Actions\V1\Product;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Haljina\Models\Product;
use Auth;

class RemoveProductAction
{
    use asAction;
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
