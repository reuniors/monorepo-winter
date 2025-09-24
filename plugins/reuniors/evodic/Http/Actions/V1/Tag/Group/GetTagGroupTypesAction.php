<?php namespace Reuniors\Evodic\Http\Actions\V1\Tag\Group;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\TagGroup;

class GetTagGroupTypesAction extends BaseAction
{

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
