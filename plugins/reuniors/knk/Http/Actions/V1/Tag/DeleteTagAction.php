<?php namespace Reuniors\Knk\Http\Actions\V1\Tag;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Tag;

class DeleteTagAction extends BaseAction
{
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], Tag $tag = null)
    {
        $tag->delete();

        return true;
    }

    public function asController(Tag $tag = null): array
    {
        return parent::asController($tag);
    }
}
