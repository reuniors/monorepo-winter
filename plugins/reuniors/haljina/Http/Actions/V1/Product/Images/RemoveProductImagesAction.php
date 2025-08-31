<?php namespace Reuniors\Haljina\Http\Actions\V1\Product\Images;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Haljina\Models\Product;
use Auth;

class RemoveProductImagesAction
{
    use asAction;
    public function rules()
    {
        return [
            'postId' => ['required'],
            'imagesIds' => ['required', 'array'],
        ];
    }

    public function handle($attributes = [])
    {
        $productId = $attributes['postId'];
        $imagesIds = $attributes['imagesIds'];

        $product = Product::where('id', $productId)
            ->firstOrFail();
        $images = $product->product_images()
            ->whereIn('id', $imagesIds)
            ->get();

        foreach ($images as $image) {
            $image->delete();
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
