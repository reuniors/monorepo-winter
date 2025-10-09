<?php namespace Reuniors\Botovi\Http\Actions\V1\Person;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Person;
use Reuniors\Botovi\Models\PersonActivityLog;
use Illuminate\Support\Facades\Auth;

class PersonDeleteAction extends BaseAction
{
    public function rules()
    {
        return [
            'personId' => ['required', 'integer', 'exists:reuniors_botovi_people,id'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $person = Person::findOrFail($attributes['personId']);
        $user = Auth::getUser();
        
        // Check permissions
        if ($person->created_by !== $user->id && !$user->hasPermission('reuniors.botovi.manage_persons')) {
            throw new \Exception('Unauthorized');
        }

        // Log activity before deletion
        PersonActivityLog::create([
            'person_id' => $person->id,
            'user_id' => $user->id,
            'action' => 'deleted',
            'description' => 'Person deleted',
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);

        // Soft delete
        $person->delete();

        return ['success' => true, 'message' => 'Person deleted successfully'];
    }
}
