<?php namespace Reuniors\Botovi\Http\Actions\V1\Export;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\PersonExportLog;

class PersonExportStatusAction extends BaseAction
{
    public function rules()
    {
        return [
            'exportLogId' => ['required', 'string', 'exists:reuniors_botovi_person_export_log,id'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $exportLog = PersonExportLog::findOrFail($attributes['exportLogId']);

        return [
            'id' => $exportLog->id,
            'status' => $exportLog->status,
            'export_format' => $exportLog->export_format,
            'file_path' => $exportLog->file_path,
            'file_size' => $exportLog->file_size,
            'error_message' => $exportLog->error_message,
            'created_at' => $exportLog->created_at,
            'updated_at' => $exportLog->updated_at,
        ];
    }
}
