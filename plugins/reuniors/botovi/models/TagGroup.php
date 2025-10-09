<?php namespace Reuniors\Botovi\Models;

use Model;
use Winter\Storm\Database\Traits\Validation;

/**
 * TagGroup Model
 */
class TagGroup extends Model
{
    use Validation;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_botovi_tag_groups';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'name' => 'required|string|max:255',
        'slug' => 'required|string|max:255|unique:reuniors_botovi_tag_groups,slug',
    ];

    protected $fillable = [
        'name',
        'slug',
        'description',
        'sort_order',
    ];

    public $belongsToMany = [
        'tags' => [
            'Reuniors\Base\Models\Tag',
            'table' => 'reuniors_botovi_tags_tag_groups',
            'key' => 'tag_group_id',
            'otherKey' => 'tag_id',
        ],
    ];

    // Scopes
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
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
