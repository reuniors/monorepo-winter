<?php namespace Reuniors\Evodic\Http\Actions\V1\QA\Answers;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Location;

class GetQaAnswersAction extends BaseAction
{

    public function rules()
    {
        return [
            'search' => 'string',
            'perPage' => 'integer',
        ];
    }

    public function handle(array $attributes = [], Location $location = null)
    {
        $search = $attributes['search'] ?? null;
        $perPage = $attributes['perPage'] ?? 15;

        $qaAnswerQuery = $location->qaAnswers()->with('qaQuestion');

        if ($search) {
            $qaAnswerQuery->whereHas('question', function ($query) use ($search) {
                $query->where('title', 'like', "%$search%" );
            });
        }

        return $qaAnswerQuery->paginate($perPage);
    }

    public function asController(Location $location = null): array
    {
        return parent::asController($location);
    }
}
