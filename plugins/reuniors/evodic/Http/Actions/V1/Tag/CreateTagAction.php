<?php namespace Reuniors\Evodic\Http\Actions\V1\Tag;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Classes\Helpers\S;
use Reuniors\Evodic\Models\PlaceType;
use Reuniors\Evodic\Models\Tag;

class CreateTagAction
{
    use asAction;

    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.title' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $data = $attributes['data'];

        $data['name'] = S::camel($data['title']);
        $data['slug'] = S::slug($data['title']);

        $tag = Tag::create($data);

        return [
            'success' => true,
            'data' => $tag
        ];
    }

    public function asController(Request $request)
    {
        $requestData = $request->all();
        return $this->handle($requestData);
    }
}
