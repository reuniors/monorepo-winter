<?php namespace Reuniors\Haljina\Http\Actions\V1\Product\profile;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Haljina\Models\Product;

class GetProfileProductsAction extends BaseAction {
    public function handle($profileNickname, $filters = [])
    {
        return Product
            ::with(['product_images', 'user'])
            ->whereHas('user', function ($query) use ($profileNickname) {
                $query->where('username', $profileNickname);
            })
            ->orderByDesc('created_at')
            ->paginate();
    }

    public function asController($profileNickname)
    {
        $requestData = request()->all();
        return $this->handle($profileNickname, $requestData);
    }
}
