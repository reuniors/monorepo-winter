<?php namespace Reuniors\Evodic\Http\Actions\V1\QA\Questions;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\QaQuestion;

class DeleteQaQuestionAction
{
    use asAction;

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
