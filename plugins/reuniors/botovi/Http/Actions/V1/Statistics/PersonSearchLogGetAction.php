<?php namespace Reuniors\Botovi\Http\Actions\V1\Statistics;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\PersonSearchLog;

class PersonSearchLogGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
            'search_term' => ['nullable', 'string'],
            'date_from' => ['nullable', 'date'],
            'date_to' => ['nullable', 'date', 'after:date_from'],
            'page' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $query = PersonSearchLog::with('user');

        if (isset($attributes['user_id'])) {
            $query->byUser($attributes['user_id']);
        }

        if (isset($attributes['search_term'])) {
            $query->bySearchTerm($attributes['search_term']);
        }

        if (isset($attributes['date_from'])) {
            $query->where('created_at', '>=', $attributes['date_from']);
        }

        if (isset($attributes['date_to'])) {
            $query->where('created_at', '<=', $attributes['date_to']);
        }

        $query->recent();

        $perPage = $attributes['per_page'] ?? 20;
        return $query->paginate($perPage);
    }
}
