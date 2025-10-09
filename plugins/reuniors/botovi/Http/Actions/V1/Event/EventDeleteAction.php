<?php namespace Reuniors\Botovi\Http\Actions\V1\Event;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Event;
use Illuminate\Support\Facades\Auth;

class EventDeleteAction extends BaseAction
{
    public function rules()
    {
        return [
            'eventId' => ['required', 'string', 'exists:reuniors_botovi_events,id'],
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

        // Soft delete
        $event->delete();

        return ['success' => true, 'message' => 'Event deleted successfully'];
    }
}
