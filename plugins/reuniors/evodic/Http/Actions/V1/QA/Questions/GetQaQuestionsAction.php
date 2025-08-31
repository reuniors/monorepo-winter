<?php namespace Reuniors\Evodic\Http\Actions\V1\QA\Questions;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\QaQuestion;

class GetQaQuestionsAction
{
    use asAction;

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
