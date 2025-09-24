<?php namespace Reuniors\Haljina\Http\Actions\V1\ProductSize;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Haljina\Models\ProductSize;

class FindProductSize extends BaseAction
{

    public function rules()
    {
        return [
            'title' => ['string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $title = $attributes['title'] ?? null;

        if ($title) {
            return ProductSize::where('title', $title)
                ->first();
        }

        return null;
    }
}
