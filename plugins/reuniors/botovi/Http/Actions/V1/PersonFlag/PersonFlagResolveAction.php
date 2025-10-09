<?php namespace Reuniors\Botovi\Http\Actions\V1\PersonFlag;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\PersonFlag;
use Illuminate\Support\Facades\Auth;

class PersonFlagResolveAction extends BaseAction
{
    public function rules()
    {
        return [
            'flagId' => ['required', 'integer', 'exists:reuniors_botovi_person_flags,id'],
            'status' => ['required', 'string', 'in:approved,rejected'],
            'admin_notes' => ['nullable', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        
        // Check admin permissions
        if (!$user->hasPermission('reuniors.botovi.manage_flags')) {
            throw new \Exception('Unauthorized');
        }

        $flag = PersonFlag::findOrFail($attributes['flagId']);
        
        if ($attributes['status'] === 'approved') {
            $flag->approve($user->id, $attributes['admin_notes'] ?? null);
        } else {
            $flag->reject($user->id, $attributes['admin_notes'] ?? null);
        }

        return $flag;
    }
}
