<?php namespace Reuniors\Evodic\Http\Actions\V1\Tag\Group;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\TagGroup;

class GetTagGroupTypesAction
{
    use asAction;

    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [])
    {
        return [
            'success' => true,
            'data' => TagGroup::TYPES
        ];
    }

    public function asController(Request $request)
    {
        $requestData = $request->all();
        return $this->handle($requestData);
    }
}
