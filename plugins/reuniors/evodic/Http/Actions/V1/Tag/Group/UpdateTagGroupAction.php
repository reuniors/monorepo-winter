<?php namespace Reuniors\Evodic\Http\Actions\V1\Tag\Group;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Classes\Helpers\S;
use Reuniors\Base\Models\TagGroup;

class UpdateTagGroupAction extends BaseAction
{

    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.title' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [], TagGroup $tagGroup)
    {
        $data = $attributes['data'];

        $data['name'] = S::camel($data['title']);

        $tagGroup->update($data);

        return [
            'success' => true,
            'data' => $tagGroup
        ];
    }

    public function asController(Request $request, TagGroup $tagGroup)
    {
        $requestData = $request->all();
        return $this->handle($requestData, $tagGroup);
    }
}
