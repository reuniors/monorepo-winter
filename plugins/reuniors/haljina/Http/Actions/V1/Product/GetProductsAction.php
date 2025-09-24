<?php namespace Reuniors\Haljina\Http\Actions\V1\Product;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Haljina\Models\Product;

class GetProductsAction extends BaseAction {
    public function handle($filters = [])
    {
        return Product::paginate();
    }
}
