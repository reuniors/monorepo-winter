<?php namespace Reuniors\Evodic\Http\Actions\V1\QA\Answers;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Http\Actions\V1\QA\Questions\CreateQaQuestionAction;
use Reuniors\Evodic\Models\Location;
use Reuniors\Evodic\Models\QaAnswer;

class CreateQaAnswerAction extends BaseAction
{

    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.text' => ['required', 'string'],
            'data.qa_question_id' => ['integer', 'nullable'],
            'data.question_title' => ['string', 'nullable', 'required_without:data.qa_question_id'],
        ];
    }

    public function handle(array $attributes = [], Location $location = null)
    {
        $data = $attributes['data'];
        $qaQuestionId = $data['qa_question_id'];

        if (!$qaQuestionId) {
            $qaQuestion = CreateQaQuestionAction::run([
                'data' => [
                    'title' => $data['question_title'],
                    'active' => true,
                ]
            ]);
            $data['qa_question_id'] = $qaQuestion->id;
        }

        $data['active'] = true;
        $data['location_id'] = $location->id;

        return QaAnswer::create($data);
    }

    public function asController(Location $location = null): array
    {
        return parent::asController($location);
    }
}
