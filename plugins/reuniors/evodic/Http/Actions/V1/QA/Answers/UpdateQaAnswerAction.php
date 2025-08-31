<?php namespace Reuniors\Evodic\Http\Actions\V1\QA\Answers;

use Illuminate\Http\Request;
use InvalidArgumentException;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Http\Actions\V1\QA\Questions\CreateQaQuestionAction;
use Reuniors\Evodic\Http\Actions\V1\QA\Questions\DeleteQaQuestionAction;
use Reuniors\Evodic\Models\Location;
use Reuniors\Evodic\Models\QaAnswer;

class UpdateQaAnswerAction
{
    use asAction;

    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.qa_question_id' => ['integer', 'nullable'],
            'data.question_title' => ['string', 'nullable', 'required_without:data.qa_question_id'],
        ];
    }

    public function handle(Location $location, QaAnswer $qaAnswer, array $attributes = [])
    {
        $data = $attributes['data'];
        $oldQaQuestionId = $qaAnswer->qa_question_id;
        $qaQuestionId = $data['qa_question_id'];
        $qaQuestionTitle = $data['question_title'] ?? null;
        $oldQaQuestion = $qaAnswer->qaQuestion;

        if ($location->id !== $qaAnswer->location_id) {
            throw new InvalidArgumentException('Location and QaAnswer do not match');
        }
        if ($qaQuestionTitle && !$qaQuestionId) {
            $qaQuestion = CreateQaQuestionAction::run([
                'data' => [
                    'title' => $qaQuestionTitle,
                    'active' => true,
                ]
            ]);
            $data['qa_question_id'] = $qaQuestion->id;
        }
        if ($qaQuestionTitle) {
            unset($data['question_title']);
        }
        $qaAnswer
            ->update($data);

        if ($oldQaQuestionId !== $qaQuestionId) {
            DeleteQaQuestionAction::run($oldQaQuestion);
        }

        return [
            'success' => true,
            'data' => $qaAnswer
        ];
    }

    public function asController(Request $request, Location $location, QaAnswer $qaAnswer)
    {
        $requestData = $request->all();
        return $this->handle($location, $qaAnswer, $requestData);
    }
}
