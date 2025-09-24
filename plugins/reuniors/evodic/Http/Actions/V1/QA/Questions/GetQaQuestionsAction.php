<?php namespace Reuniors\Evodic\Http\Actions\V1\QA\Questions;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\QaQuestion;

class GetQaQuestionsAction extends BaseAction
{

    public function rules()
    {
        return [
            'search' => 'string',
            'perPage' => 'integer',
            'locationId' => 'integer',
        ];
    }

    public function handle(array $attributes = [])
    {
        $search = $attributes['search'] ?? null;
        $perPage = $attributes['perPage'] ?? 15;
        $locationId = $attributes['locationId'] ?? null;

        $qaQuestionQuery = QaQuestion::query();

        if ($search) {
            $qaQuestionQuery->where('title', 'like', "%$search%" );
        }
        if ($locationId) {
            $qaQuestionQuery->whereHas('locations', function ($query) use ($locationId) {
                $query->where('location_id', $locationId);
            });
        }

        return [
            'success' => true,
            'data' => $qaQuestionQuery->paginate($perPage)
        ];
    }

    public function asController(Request $request)
    {
        $requestData = $request->all();
        return $this->handle($requestData);
    }
}
