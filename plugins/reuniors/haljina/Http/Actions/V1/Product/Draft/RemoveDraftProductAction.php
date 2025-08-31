<?php namespace Reuniors\Haljina\Http\Actions\V1\Product\Draft;

use Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Haljina\Models\Product;

class RemoveDraftProductAction
{
    use asAction;
    public function rules()
    {
        return [];
    }

    public function handle($attributes = [])
    {
        try {
            Product::deleteProduct([
                'isDraft' => true,
            ]);
        } catch (ModelNotFoundException $e) {
            return [
                'success' => true,
                'message' => 'Draft Product not found',
            ];
        }

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
