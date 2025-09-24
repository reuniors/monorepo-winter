<?php namespace Reuniors\Evodic\Http\Actions\V1\Tag;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\Tag;

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
