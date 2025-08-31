<?php namespace Reuniors\Haljina\Http\Actions\V1\ProductSize;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Haljina\Models\ProductSize;

class FindProductSize
{
    use asAction;

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
