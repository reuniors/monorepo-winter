<?php namespace Reuniors\Haljina\Http\Actions\V1\Product;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Haljina\Models\Product;

class GetPendingProductsAction extends BaseAction {
    public function handle($filters = [])
    {
        return Product::where('status', 'pending')->paginate();
    }
}
