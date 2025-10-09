<?php namespace Reuniors\Botovi\Models;

use Model;
use Winter\Storm\Database\Traits\Validation;

/**
 * PersonSearchLog Model
 */
class PersonSearchLog extends Model
{
    use Validation;

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_botovi_person_search_log';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'user_id' => 'nullable|integer|exists:users,id',
        'search_term' => 'required|string|max:255',
        'ip_address' => 'nullable|ip',
    ];

    protected $fillable = [
        'user_id',
        'search_term',
        'filters',
        'results_count',
        'ip_address',
        'user_agent',
    ];

    public $belongsTo = [
        'user' => ['Winter\User\Models\User'],
    ];

    // Scopes
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeBySearchTerm($query, $searchTerm)
    {
        return $query->where('search_term', 'like', '%' . $searchTerm . '%');
    }

    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
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
