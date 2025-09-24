<?php namespace Reuniors\Base\Http\Actions\V1\Tag;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\Tag;

class DeleteTagAction extends BaseAction {
    public function rules()
    {
        return [
            'id' => 'required|integer|exists:reuniors_base_tags,id',
        ];
    }

    public function handle(array $data)
    {
        $tag = Tag::findOrFail($data['id']);
        $tag->delete();

        return [
            'success' => true,
            'message' => 'Tag deleted successfully'
        ];
    }

    public function asController(Request $request)
    {
        return $this->handle($request->all());
    }
}
