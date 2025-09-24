<?php namespace Reuniors\Evodic\Http\Actions\V1\Tag;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\Tag;

class GetOneTagAction extends BaseAction
{

    public function rules()
    {
        return [];
    }

    public function handle(Tag $tag)
    {
        return [
            'success' => true,
            'data' => $tag
        ];
    }

    public function asController(Request $request, Tag $tag)
    {
        return $this->handle($tag);
    }
}
