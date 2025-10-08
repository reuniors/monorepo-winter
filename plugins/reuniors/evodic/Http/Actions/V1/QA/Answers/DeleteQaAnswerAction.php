<?php namespace Reuniors\Evodic\Http\Actions\V1\QA\Answers;

use Illuminate\Http\Request;
use InvalidArgumentException;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Http\Actions\V1\QA\Questions\DeleteQaQuestionAction;
use Reuniors\Evodic\Models\Location;
use Reuniors\Evodic\Models\QaAnswer;

class DeleteQaAnswerAction extends BaseAction
{

    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], Location $location = null, QaAnswer $qaAnswer = null)
    {
        if ($location->id !== $qaAnswer->location_id) {
            throw new InvalidArgumentException('Location and QaAnswer do not match');
        }
        $qaQuestion = $qaAnswer->qaQuestion;

        $qaAnswer->delete();

        DeleteQaQuestionAction::run([], $qaQuestion);

        return true;
    }

    public function asController(Location $location = null, QaAnswer $qaAnswer = null): array
    {
        return parent::asController($location, $qaAnswer);
    }
}
