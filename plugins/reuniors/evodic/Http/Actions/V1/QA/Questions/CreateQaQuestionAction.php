<?php namespace Reuniors\Evodic\Http\Actions\V1\QA\Questions;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Classes\Helpers\S;
use Reuniors\Evodic\Models\QaQuestion;

class CreateQaQuestionAction
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
        $data['active'] = true;

        return QaQuestion::create($data);
    }

    public function asController(Request $request)
    {
        $requestData = $request->all();

        return [
            'data' => $this->handle($requestData),
            'success' => true
        ];
    }
}
