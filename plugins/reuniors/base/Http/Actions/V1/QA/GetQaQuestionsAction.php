<?php namespace Reuniors\Base\Http\Actions\V1\QA;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Models\QaQuestion;

class GetQaQuestionsAction
{
    use AsAction;

    public function rules()
    {
        return [
            'search' => 'nullable|string|max:255',
            'per_page' => 'nullable|integer|min:1|max:100',
            'order_by' => 'nullable|string|in:order,created_at,updated_at',
            'order_direction' => 'nullable|string|in:asc,desc',
        ];
    }

    public function handle(array $attributes = [])
    {
        $search = $attributes['search'] ?? null;
        $perPage = $attributes['per_page'] ?? 15;
        $orderBy = $attributes['order_by'] ?? 'order';
        $orderDirection = $attributes['order_direction'] ?? 'asc';

        $questions = QaQuestion::query();

        if ($search) {
            $questions->where(function($query) use ($search) {
                $query->where('question', 'like', "%{$search}%")
                      ->orWhere('answer', 'like', "%{$search}%");
            });
        }

        return [
            'success' => true,
            'data' => $questions->orderBy($orderBy, $orderDirection)->paginate($perPage)
        ];
    }

    public function asController(Request $request)
    {
        return $this->handle($request->all());
    }
}
