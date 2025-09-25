<?php namespace Reuniors\Haljina\Http\Actions\V1\Product\Draft;

use Auth;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Haljina\Http\Enums\ProductStatuses;
use Reuniors\Haljina\Models\Product;

class CreateDraftProductAction extends BaseAction
{

    public function handle(array $attributes = [])
    {
        $user = Auth::user();

        $productDraft = Product::where('status', ProductStatuses::DRAFT)
            ->where('user_id', $user->id)
            ->with('product_images')
            ->first();

        if (!$productDraft) {
            $productDraft = Product::create([
                'user_id' => $user->id,
                'status' => ProductStatuses::DRAFT,
                'name' => 'Draft Product',
                'title' => 'Draft Product',
                'slug' => 'draft',
                'active' => false,
                'price' => 0,
                'category_id' => 0,
                'currency_id' => 1,
            ]);
        }

        return $productDraft;
    }
}
