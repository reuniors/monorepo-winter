<?php namespace Reuniors\Haljina\Http\Actions\V1\Product\Draft;

use Auth;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Haljina\Http\Enums\ProductStatuses;
use Reuniors\Haljina\Models\Product;

class GetDraftProductAction
{
    use asAction;

    public function handle()
    {
        $user = Auth::user();

        $productDraft = Product::where('status', ProductStatuses::DRAFT)
            ->where('user_id', $user->id)
            ->with(['product_images'])
            ->first();

        return [
            'success' => !!$productDraft,
            'data' => $productDraft
        ];
    }
}
