<?php namespace Reuniors\Botovi\Http\Actions\V1\PersonReport;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\PersonReport;
use Illuminate\Support\Facades\Auth;

class PersonReportResolveAction extends BaseAction
{
    public function rules()
    {
        return [
            'reportId' => ['required', 'integer', 'exists:reuniors_botovi_person_reports,id'],
            'status' => ['required', 'string', 'in:approved,rejected'],
            'admin_notes' => ['nullable', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        
        // Check admin permissions
        if (!$user->hasPermission('reuniors.botovi.manage_reports')) {
            throw new \Exception('Unauthorized');
        }

        $report = PersonReport::findOrFail($attributes['reportId']);
        
        if ($attributes['status'] === 'approved') {
            $report->approve($user->id, $attributes['admin_notes'] ?? null);
        } else {
            $report->reject($user->id, $attributes['admin_notes'] ?? null);
        }

        return $report;
    }
}
