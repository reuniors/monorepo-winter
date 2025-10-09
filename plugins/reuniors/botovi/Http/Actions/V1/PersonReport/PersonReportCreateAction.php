<?php namespace Reuniors\Botovi\Http\Actions\V1\PersonReport;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Person;
use Reuniors\Botovi\Models\PersonReport;
use Illuminate\Support\Facades\Auth;

class PersonReportCreateAction extends BaseAction
{
    public function rules()
    {
        return [
            'personId' => ['required', 'integer', 'exists:reuniors_botovi_people,id'],
            'report_type' => ['required', 'string', 'in:inappropriate,false_info,duplicate,spam,harassment,privacy_violation,other'],
            'reason' => ['required', 'string', 'max:500'],
            'description' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        $person = Person::findOrFail($attributes['personId']);

        $report = PersonReport::create([
            'person_id' => $person->id,
            'reported_by' => $user->id,
            'report_type' => $attributes['report_type'],
            'reason' => $attributes['reason'],
            'description' => $attributes['description'] ?? null,
            'status' => 'pending',
        ]);

        return $report;
    }
}
