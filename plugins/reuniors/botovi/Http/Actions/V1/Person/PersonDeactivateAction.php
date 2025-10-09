<?php namespace Reuniors\Botovi\Http\Actions\V1\Person;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Person;
use Reuniors\Botovi\Models\PersonActivityLog;
use Illuminate\Support\Facades\Auth;

class PersonDeactivateAction extends BaseAction
{
    public function rules()
    {
        return [
            'personId' => ['required', 'integer', 'exists:reuniors_botovi_people,id'],
            'reason' => ['required', 'string'],
            'admin_notes' => ['nullable', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        
        // Check admin permissions
        if (!$user->hasPermission('reuniors.botovi.manage_persons')) {
            throw new \Exception('Unauthorized');
        }

        $person = Person::findOrFail($attributes['personId']);
        
        $person->deactivate($attributes['reason'], $attributes['admin_notes'] ?? null);

        // Log activity
        PersonActivityLog::create([
            'person_id' => $person->id,
            'user_id' => $user->id,
            'action' => 'deactivated',
            'description' => 'Person deactivated by admin',
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);

        return $person;
    }
}
