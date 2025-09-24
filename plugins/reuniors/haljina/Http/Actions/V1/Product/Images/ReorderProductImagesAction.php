<?php namespace Reuniors\Haljina\Http\Actions\V1\Product\Images;

use Auth;
use Illuminate\Support\Facades\DB;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Classes\Helpers\ReorderDataHelper;
use Reuniors\Haljina\Models\Product;
use Winter\Storm\Support\Facades\Input;

class ReorderProductImagesAction extends BaseAction {
    public function rules()
    {
        return [
            'postId' => ['required'],
            'reorderData' => ['required', 'array'],
        ];
    }

    public function handle($attributes = [])
    {
        $user = Auth::user();
        $postId = $attributes['postId'];
        $reorderData = $attributes['reorderData'];


        $product = Product::where('id', $postId)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if ($product) {
            ReorderDataHelper::reorderModelData(
                $product->product_images()->getQuery(),
                $reorderData
            );
        }
        return [
            'success' => true,
            'data' => null
        ];
    }

    public function asController()
    {
        $requestData = request()->all();
        return $this->handle($requestData);
    }
}
