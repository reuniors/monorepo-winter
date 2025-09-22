<?php namespace Reuniors\Evodic\Http\Actions\V1\Tag;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Models\Tag;

class GetOneTagAction
{
    use asAction;

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
