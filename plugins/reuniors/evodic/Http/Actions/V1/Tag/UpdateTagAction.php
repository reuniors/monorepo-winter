<?php namespace Reuniors\Evodic\Http\Actions\V1\Tag;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Classes\Helpers\S;
use Reuniors\Base\Models\Tag;

class UpdateTagAction
{
    use asAction;

    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.title' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [], Tag $tag)
    {
        $data = $attributes['data'];

        $data['name'] = S::camel($data['title']);

        $tag->update($data);

        return [
            'success' => true,
            'data' => $tag
        ];
    }

    public function asController(Request $request, Tag $tag)
    {
        $requestData = $request->all();
        return $this->handle($requestData, $tag);
    }
}
