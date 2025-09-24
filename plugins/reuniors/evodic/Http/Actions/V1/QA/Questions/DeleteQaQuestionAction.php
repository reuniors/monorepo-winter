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

    public function handle(QaQuestion $qaQuestion)
    {
        if ($qaQuestion->answers()->get()->isEmpty()) {
            $qaQuestion->delete();
        }

        return [
            'success' => true,
        ];
    }

    public function asController(Request $request, QaQuestion $qaQuestion)
    {
        return $this->handle($qaQuestion);
    }
}
