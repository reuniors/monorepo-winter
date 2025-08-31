<?php

namespace Reuniors\Reservations\Http\Actions\V1\News;

use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\News;

class NewsDeleteAction extends BaseAction
{
    public function rules()
    {
        return [
            'id' => ['required', 'string', 'uuid'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $news = News::find($attributes['id']);
        if (!$news) {
            throw new \Exception('News not found');
        }

        $news->delete();

        return true;
    }
}
