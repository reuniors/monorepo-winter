<?php namespace Reuniors\Haljina\Http\Actions\V1\Product;

use Auth;
use Illuminate\Support\Str;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Haljina\Http\Actions\V1\Product\Draft\CreateDraftProductAction;
use Reuniors\Haljina\Http\Enums\ProductStatuses;

class AddProductAction extends BaseAction {
    public function rules()
    {
        return [
            'name' => ['required', 'between:2,255'],
            'description' => ['required', 'between:2,255'],
            'price' => ['required', 'digits_between:1,10'],
            'categoryId' => ['required', 'numeric'],
            'size' => ['required', 'between:1,255'],
        ];
    }

    public function handle($attributes = [])
    {
        $draftProductResponse = CreateDraftProductAction::run();
        if (!isset($draftProductResponse['data'])) {
            throw new \Exception('Product draft not found');
        }
        $product = $draftProductResponse['data'];
        if ($product->category_id && $product->product_images->count()) {
            $product->status = ProductStatuses::PENDING;
        }

        $product->save();

        return $product;
    }
}
