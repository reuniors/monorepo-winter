<?php namespace Reuniors\Botovi\Models;

use Model;
use Winter\Storm\Database\Traits\Validation;

/**
 * PersonStatistics Model
 */
class PersonStatistics extends Model
{
    use Validation;

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_botovi_person_statistics';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'person_id' => 'required|integer|exists:reuniors_botovi_people,id',
        'date' => 'required|date',
    ];

    protected $fillable = [
        'person_id',
        'date',
        'views_count',
        'likes_count',
        'dislikes_count',
        'comments_count',
        'reviews_count',
        'flags_count',
        'reports_count',
        'shares_count',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public $belongsTo = [
        'person' => ['Reuniors\Botovi\Models\Person'],
    ];

    // Scopes
    public function scopeByPerson($query, $personId)
    {
        return $query->where('person_id', $personId);
    }

    public function scopeByDate($query, $date)
    {
        return $query->where('date', $date);
    }

    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('date', [$startDate, $endDate]);
    }

    public function scopeRecent($query)
    {
        return $query->orderBy('date', 'desc');
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
