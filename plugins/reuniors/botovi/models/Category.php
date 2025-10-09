<?php namespace Reuniors\Botovi\Models;

use Model;
use Winter\Storm\Database\Traits\SoftDelete;
use Winter\Storm\Database\Traits\Validation;
use Winter\Storm\Database\Traits\NestedTree;

/**
 * Category Model
 */
class Category extends Model
{
    use Validation;
    use SoftDelete;
    use NestedTree;

    protected $dates = ['deleted_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_botovi_categories';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'name' => 'required|string|max:255',
        'slug' => 'required|string|max:255|unique:reuniors_botovi_categories,slug',
    ];

    protected $fillable = [
        'name',
        'slug',
        'description',
        'parent_id',
        'nest_left',
        'nest_right',
        'nest_depth',
        'sort_order',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public $belongsTo = [
        'parent' => ['Reuniors\Botovi\Models\Category', 'key' => 'parent_id'],
    ];

    public $hasMany = [
        'children' => ['Reuniors\Botovi\Models\Category', 'key' => 'parent_id'],
    ];

    public $belongsToMany = [
        'people' => [
            'Reuniors\Botovi\Models\Person',
            'table' => 'reuniors_botovi_people_categories',
            'key' => 'category_id',
            'otherKey' => 'person_id',
        ],
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeRoot($query)
    {
        return $query->whereNull('parent_id');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    // Accessors
    public function getIsRootAttribute()
    {
        return is_null($this->parent_id);
    }

    public function getHasChildrenAttribute()
    {
        return $this->children()->count() > 0;
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
