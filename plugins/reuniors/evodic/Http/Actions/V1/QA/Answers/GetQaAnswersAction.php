<?php namespace Reuniors\Evodic\Http\Actions\V1\QA\Answers;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\Location;

class GetQaAnswersAction
{
    use asAction;

    public function rules()
    {
        return [
            'search' => 'string',
            'perPage' => 'integer',
        ];
    }

    public function handle(Location $location, array $attributes = [])
    {
        $search = $attributes['search'] ?? null;
        $perPage = $attributes['perPage'] ?? 15;

        $qaAnswerQuery = $location->qaAnswers()->with('qaQuestion');

        if ($search) {
            $qaAnswerQuery->whereHas('question', function ($query) use ($search) {
                $query->where('title', 'like', "%$search%" );
            });
        }

        return [
            'success' => true,
            'data' => $qaAnswerQuery->paginate($perPage)
        ];
    }

    public function asController(Request $request, Location $location)
    {
        $requestData = $request->all();
        return $this->handle($location, $requestData);
    }
}
