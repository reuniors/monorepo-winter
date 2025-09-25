<?php namespace Reuniors\Haljina\Http\Actions\V1\ProductSize;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Haljina\Models\ProductSize;

class GetProductSizes extends BaseAction
{

    public function handle(array $attributes = [])
    {
        return ProductSize::query()
            ->paginate(1000);
    }
}
