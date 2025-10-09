<?php namespace Reuniors\Botovi\Http\Actions\V1\Event;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Event;
use Illuminate\Support\Facades\Auth;

class EventUpdateAction extends BaseAction
{
    public function rules()
    {
        return [
            'eventId' => ['required', 'string', 'exists:reuniors_botovi_events,id'],
            'title' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'event_date' => ['nullable', 'date'],
            'event_type' => ['nullable', 'string', 'in:meeting,interview,public_appearance,social_event,work_event,other'],
            'location' => ['nullable', 'string'],
            'status' => ['nullable', 'string', 'in:draft,published,archived'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        $event = Event::findOrFail($attributes['eventId']);
        
        // Check permissions
        if ($event->created_by !== $user->id && !$user->hasPermission('reuniors.botovi.manage_events')) {
            throw new \Exception('Unauthorized');
        }

        // Update fields
        $updateFields = array_filter($attributes, function($key) {
            return !in_array($key, ['eventId']);
        }, ARRAY_FILTER_USE_KEY);

        $event->fill($updateFields);
        $event->save();

        return $event;
    }
}
