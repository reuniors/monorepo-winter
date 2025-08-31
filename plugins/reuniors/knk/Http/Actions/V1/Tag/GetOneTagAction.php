<?php namespace Reuniors\Knk\Http\Actions\V1\Tag;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Tag;

class GetOneTagAction extends BaseAction
{
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], Tag $tag = null)
    {
        return $tag;
    }

    public function asController(Tag $tag = null): array
    {
        return parent::asController($tag);
    }
}
