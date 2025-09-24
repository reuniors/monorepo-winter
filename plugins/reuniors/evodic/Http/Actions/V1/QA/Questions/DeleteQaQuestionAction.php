<?php namespace Reuniors\Evodic\Http\Actions\V1\QA\Questions;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\QaQuestion;

class DeleteQaQuestionAction extends BaseAction
{

    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], QaQuestion $qaQuestion = null)
    {
        if ($qaQuestion->answers()->get()->isEmpty()) {
            $qaQuestion->delete();
        }

        return true;
    }

    public function asController(QaQuestion $qaQuestion = null): array
    {
        return parent::asController($qaQuestion);
    }
}
