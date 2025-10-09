<?php namespace Reuniors\Botovi\Http\Actions\V1\Event;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Person;
use Reuniors\Botovi\Models\Event;
use Illuminate\Support\Facades\Auth;

class EventCreateAction extends BaseAction
{
    public function rules()
    {
        return [
            'personId' => ['required', 'integer', 'exists:reuniors_botovi_people,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'event_date' => ['required', 'date'],
            'event_type' => ['required', 'string', 'in:meeting,interview,public_appearance,social_event,work_event,other'],
            'location' => ['nullable', 'string'],
            'status' => ['nullable', 'string', 'in:draft,published,archived'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        $person = Person::findOrFail($attributes['personId']);

        $event = Event::create([
            'person_id' => $person->id,
            'created_by' => $user->id,
            'title' => $attributes['title'],
            'description' => $attributes['description'] ?? null,
            'event_date' => $attributes['event_date'],
            'event_type' => $attributes['event_type'],
            'location' => $attributes['location'] ?? null,
            'status' => $attributes['status'] ?? 'draft',
        ]);

        return $event;
    }
}
