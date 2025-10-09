<?php namespace Reuniors\Botovi\Http\Actions\V1\Event;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Event;

class EventGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'page' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
            'person_id' => ['nullable', 'integer', 'exists:reuniors_botovi_people,id'],
            'event_type' => ['nullable', 'string', 'in:meeting,interview,public_appearance,social_event,work_event,other'],
            'status' => ['nullable', 'string', 'in:draft,published,archived'],
            'upcoming' => ['nullable', 'boolean'],
            'sort_by' => ['nullable', 'string', 'in:created_at,event_date,title,likes_count'],
            'sort_order' => ['nullable', 'string', 'in:asc,desc'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $query = Event::with(['person', 'creator']);

        // Apply filters
        if (isset($attributes['person_id'])) {
            $query->where('person_id', $attributes['person_id']);
        }

        if (isset($attributes['event_type'])) {
            $query->byType($attributes['event_type']);
        }

        if (isset($attributes['status'])) {
            $query->where('status', $attributes['status']);
        }

        if (isset($attributes['upcoming'])) {
            if ($attributes['upcoming']) {
                $query->upcoming();
            } else {
                $query->past();
            }
        }

        // Apply sorting
        $sortBy = $attributes['sort_by'] ?? 'event_date';
        $sortOrder = $attributes['sort_order'] ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $attributes['per_page'] ?? 20;
        return $query->paginate($perPage);
    }
}
