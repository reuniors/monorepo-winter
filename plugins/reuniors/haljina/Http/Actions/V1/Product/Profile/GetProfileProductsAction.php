<?php namespace Reuniors\Haljina\Http\Actions\V1\Product\profile;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Haljina\Models\Product;

class GetProfileProductsAction extends BaseAction {
    public function handle($filters = [], $profileNickname = null)
    {
        return Product
            ::with(['product_images', 'user'])
            ->whereHas('user', function ($query) use ($profileNickname) {
                $query->where('username', $profileNickname);
            })
            ->orderByDesc('created_at')
            ->paginate();
    }

    public function asController($profileNickname = null): array
    {
        return parent::asController($profileNickname);
    }
}
