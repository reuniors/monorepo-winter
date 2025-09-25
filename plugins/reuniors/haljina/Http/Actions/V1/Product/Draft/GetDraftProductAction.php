<?php namespace Reuniors\Haljina\Http\Actions\V1\Product\Draft;

use Auth;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Haljina\Http\Enums\ProductStatuses;
use Reuniors\Haljina\Models\Product;

class GetDraftProductAction extends BaseAction
{

    public function handle(array $attributes = [])
    {
        $user = Auth::user();

        $productDraft = Product::where('status', ProductStatuses::DRAFT)
            ->where('user_id', $user->id)
            ->with(['product_images'])
            ->first();

        return !!$productDraft;
    }
}
