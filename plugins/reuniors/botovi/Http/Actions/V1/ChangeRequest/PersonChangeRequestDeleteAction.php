<?php namespace Reuniors\Botovi\Http\Actions\V1\ChangeRequest;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\ChangeRequest;
use Reuniors\Botovi\Models\Person;
use Illuminate\Support\Facades\Auth;

class PersonChangeRequestDeleteAction extends BaseAction
{
    public function rules()
    {
        return [
            'personId' => ['required', 'integer', 'exists:reuniors_botovi_people,id'],
            'scheduled_date_utc' => ['required', 'date', 'after:today'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        $person = Person::findOrFail($attributes['personId']);
        
        // Check permissions
        if ($person->created_by !== $user->id && !$user->hasPermission('reuniors.botovi.manage_persons')) {
            throw new \Exception('Unauthorized');
        }

        $changeRequest = ChangeRequest::create([
            'entity_type' => 'person',
            'entity_id' => $person->id,
            'action_class' => 'Reuniors\Botovi\Http\Actions\V1\Person\PersonDeleteAction',
            'data' => $attributes,
            'action_data' => $attributes,
            'change_type' => 'delete',
            'scheduled_date' => $attributes['scheduled_date_utc'],
            'status' => 'pending',
            'created_by' => $user->id
        ]);

        return [
            'success' => true,
            'message' => 'Change request created successfully',
            'changeRequestId' => $changeRequest->id,
            'scheduledDateUtc' => $attributes['scheduled_date_utc']
        ];
    }
}
