<?php namespace Reuniors\Haljina\Http\Actions\V1\Product\Images;

use Auth;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Haljina\Classes\Helpers\ReorderDataHelper;
use Reuniors\Haljina\Models\Product;
use Winter\Storm\Support\Facades\Input;

class UploadProductImageAction
{
    use AsAction;

    public function rules()
    {
        return [
            'postId' => ['required'],
            'file' => ['required'],
            'fileAfterId' => ['required', 'numeric'],
        ];
    }

    public function handle($attributes = [])
    {
        $user = Auth::user();
        $postId = $attributes['postId'];
        $fileAfterId = $attributes['fileAfterId'];

        $product = Product::where('id', $postId)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if (Input::hasFile('file')) {
            $imageData = $product->product_images()->create(['data' => Input::file('file')]);
            if ($fileAfterId > 0) {
                ReorderDataHelper::reorderModelData(
                    $product->product_images()->getQuery(),
                    [ ['from' => $imageData->id, 'to' => $fileAfterId] ]
                );
            }
        }
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
