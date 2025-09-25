<?php namespace Reuniors\Haljina\Http\Actions\V1\Product\Images;

use Auth;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Classes\Helpers\ReorderDataHelper;
use Reuniors\Haljina\Models\Product;
use Winter\Storm\Support\Facades\Input;

class UploadProductImageAction extends BaseAction {
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
        return $product;
    }
}
