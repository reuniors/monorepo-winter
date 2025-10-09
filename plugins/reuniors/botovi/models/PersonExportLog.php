<?php namespace Reuniors\Botovi\Models;

use Model;
use Winter\Storm\Database\Traits\Validation;

/**
 * PersonExportLog Model
 */
class PersonExportLog extends Model
{
    use Validation;

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_botovi_person_export_log';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'person_id' => 'nullable|integer|exists:reuniors_botovi_people,id',
        'exported_by' => 'required|integer|exists:users,id',
        'export_format' => 'required|in:csv,excel,pdf',
        'status' => 'in:pending,processing,completed,failed',
    ];

    protected $fillable = [
        'person_id',
        'exported_by',
        'export_format',
        'filters',
        'export_data',
        'status',
        'error_message',
        'file_path',
        'file_size',
    ];

    protected $casts = [
        'file_size' => 'integer',
    ];

    public $belongsTo = [
        'person' => ['Reuniors\Botovi\Models\Person'],
        'exported_by_user' => ['Winter\User\Models\User', 'key' => 'exported_by'],
    ];

    // Scopes
    public function scopeByPerson($query, $personId)
    {
        return $query->where('person_id', $personId);
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('exported_by', $userId);
    }

    public function scopeByFormat($query, $format)
    {
        return $query->where('export_format', $format);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    // Methods
    public function markAsProcessing()
    {
        $this->status = 'processing';
        $this->save();
    }

    public function markAsCompleted($filePath, $fileSize = null)
    {
        $this->status = 'completed';
        $this->file_path = $filePath;
        $this->file_size = $fileSize;
        $this->save();
    }

    public function markAsFailed($errorMessage)
    {
        $this->status = 'failed';
        $this->error_message = $errorMessage;
        $this->save();
    }

    // Boot method
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) \Str::uuid();
            }
        });
    }
}
