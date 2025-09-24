<?php namespace Reuniors\Haljina\Http\Actions\V1\Product\Draft;

use Auth;
use Illuminate\Support\Str;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Haljina\Http\Actions\V1\ProductSize\CreateProductSize;
use Reuniors\Haljina\Http\Actions\V1\ProductSize\FindProductSize;

class UpdateDraftProductAction extends BaseAction {
    public function rules()
    {
        return [
            'name' => ['required', 'between:2,255'],
            'description' => ['required', 'between:2,255'],
            'price' => ['required', 'digits_between:1,10'],
            'categoryId' => ['required', 'numeric'],
            'sizeId' => ['required_without:sizeTitle', 'numeric', 'nullable'],
            'sizeTitle' => ['required_without:sizeId', 'string', 'nullable'],
        ];
    }

    public function handle($attributes = [])
    {
        $draftProductResponse = CreateDraftProductAction::run();
        if (!isset($draftProductResponse['data'])) {
            throw new \Exception('Product draft not found');
        }
        $product = $draftProductResponse['data'];
        $product->title = $attributes['name'];
        $product->name = Str::camel($product->title);
        $product->slug = Str::slug($product->title);
        $product->description = $attributes['description'];
        $product->price = $attributes['price'];
        $product->category_id = $attributes['categoryId'];
        $product->currency_id = $attributes['currencyId'] ?? 1;
        if (isset($attributes['sizeId'])) {
            $product->size_id = $attributes['sizeId'];
        } else {
            $existingProductSize = FindProductSize::run([
                'title' => $attributes['sizeTitle'],
            ]);
            if ($existingProductSize) {
                $product->size_id = $existingProductSize->id;
            } else {
                $newProductSize = CreateProductSize::run([
                    'title' => $attributes['sizeTitle'],
                    'active' => false,
                ]);
                $product->size_id = $newProductSize->id;
            }
        }
        $product->active = false;

        $product->save();

        return [
            'success' => true,
            'data' => $product
        ];
    }

    public function asController()
    {
        $requestData = request()->all();
        return $this->handle($requestData);
    }
}
