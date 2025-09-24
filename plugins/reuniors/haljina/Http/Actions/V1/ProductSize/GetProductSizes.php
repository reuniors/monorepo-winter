<?php namespace Reuniors\Haljina\Http\Actions\V1\ProductSize;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Haljina\Models\ProductSize;

class GetProductSizes extends BaseAction
{

    public function handle()
    {
        return ProductSize::query()
            ->paginate(1000);
    }

    public function asController()
    {
        return [
            'success' => true,
            'data' => $this->handle()
        ];
    }
}
