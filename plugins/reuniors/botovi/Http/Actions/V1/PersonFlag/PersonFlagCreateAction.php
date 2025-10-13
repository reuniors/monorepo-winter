<?php namespace Reuniors\Botovi\Http\Actions\V1\PersonFlag;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Person;
use Reuniors\Botovi\Models\PersonFlag;
use Illuminate\Support\Facades\Auth;

class PersonFlagCreateAction extends BaseAction
{
    public function rules()
    {
        return [
            'personId' => ['required', 'integer', 'exists:reuniors_botovi_people,id'],
            'flag_type' => ['required', 'string', 'in:inaccurate_data,accurate_data,not_bot,not_caci,is_bot,is_caci,wrong_category,duplicate,outdated,misleading,inappropriate,know_person,dont_know_person,verified,unverified,sensitive,controversial,political,criminal,public_figure'],
            'reason' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        $person = Person::findOrFail($attributes['personId']);

        $flag = PersonFlag::create([
            'person_id' => $person->id,
            'flagged_by' => $user->id,
            'flag_type' => $attributes['flag_type'],
            'reason' => $attributes['reason'] ?? null,
            'description' => $attributes['description'] ?? null,
            'status' => 'pending',
        ]);

        return $flag;
    }
}
