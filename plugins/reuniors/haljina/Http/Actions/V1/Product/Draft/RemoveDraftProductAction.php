<?php namespace Reuniors\Haljina\Http\Actions\V1\Product\Draft;

use Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Haljina\Models\Product;

class RemoveDraftProductAction extends BaseAction
{
    public function rules()
    {
        return [];
    }

    public function handle($attributes = [])
    {
        Product::deleteProduct([
            'isDraft' => true,
        ]);

        return true;
    }
}
