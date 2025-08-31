<?php

namespace Reuniors\Reservations\Http\Actions\V1\News;

use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\News;

class NewsGetOneAction extends BaseAction
{
    public function rules()
    {
        return [
            'id' => ['required', 'string', 'uuid'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $news = News::with('location')->find($attributes['id']);
        if (!$news) {
            throw new \Exception('News not found');
        }

        return $news;
    }
}
