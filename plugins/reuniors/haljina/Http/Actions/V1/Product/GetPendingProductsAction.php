<?php namespace Reuniors\Haljina\Http\Actions\V1\Product;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Haljina\Models\Product;

class GetPendingProductsAction
{
    use AsAction;

    public function handle($filters = [])
    {
        return Product::where('status', 'pending')->paginate();
    }
}
