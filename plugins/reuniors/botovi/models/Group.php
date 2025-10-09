<?php namespace Reuniors\Botovi\Models;

use Model;
use Winter\Storm\Database\Traits\SoftDelete;
use Winter\Storm\Database\Traits\Validation;

/**
 * Group Model
 */
class Group extends Model
{
    use Validation;
    use SoftDelete;

    protected $dates = ['deleted_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_botovi_groups';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'name' => 'required|string|max:255',
        'slug' => 'required|string|max:255|unique:reuniors_botovi_groups,slug',
    ];

    protected $fillable = [
        'name',
        'slug',
        'description',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public $belongsToMany = [
        'people' => [
            'Reuniors\Botovi\Models\Person',
            'table' => 'reuniors_botovi_people_groups',
            'key' => 'group_id',
            'otherKey' => 'person_id',
        ],
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    // Boot method
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = \Str::slug($model->name);
            }
        });
    }
}
