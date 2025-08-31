<?php namespace Reuniors\Knk\Models;

use Illuminate\Support\Facades\Cache;
use October\Rain\Database\Traits\SoftDelete;
use October\Rain\Database\Traits\Validation;
use function foo\func;
use Model;
use October\Rain\Database\Traits\Sortable;

/**
 * Model
 */
class TagGroup extends Model
{
    use Validation;
    use SoftDelete;
    use Sortable;

    const SORT_ORDER = 'sort_order';

    protected $dates = ['deleted_at'];

    protected $jsonable = ['metadata', 'metadata_t'];

    const COMBINE_TYPES = ['Combined', 'Exclusively'];
    const COMBINE_TYPES_EXCLUSIVELY_VAL = 1;
    const COMBINE_TYPES_COMBINED_VAL = 0;

    const TYPES = [
        'standard' => 'Standard',
        'badge' => 'Badge',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_tag_groups';

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel'];
    public $translatable = [
        'title',
        'metadata_t',
        ['slug', 'index' => true]
    ];

    protected $fillable = [
        'name',
        'title',
        'description',
        'sort_order',
        'slug',
        'metadata',
        'parent_id',
        'metadata_t',
        'show_on_search',
        'show_in_filters',
        'combine_type',
        'type',
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    public $attachOne = [
        'tag_group_image' => ['System\Models\File', 'order' => 'sort_order', 'delete' => true],
    ];

    public $belongsTo = [
        'parent' => ['Reuniors\Knk\Models\TagGroup', 'order' => 'sort_order']
    ];

    public $hasMany = [
        'children' => [
            'Reuniors\Knk\Models\TagGroup',
            'key' => 'parent_id',
            'order' => 'sort_order'
        ],
        'tags' => ['Reuniors\Knk\Models\Tag']
    ];

    public function getCombineTypeOptions()
    {
        return self::COMBINE_TYPES;
    }

    public function getTypeOptions()
    {
        return self::TYPES;
    }

    public function scopeListFrontEnd($query, $options)
    {
        /**
         * Default options
         * @var $isParent
         * @var $withChildren
         * @var $withTags
         * @var $showOnSearch
         * @var $tagsShowInFilters
         * @var $showInFilters
         *
         * @var $sortBy
         * @var $sortByOrientation
         * @var $perPage
         * @var $pageNumber
         *
         */
        extract(array_merge([
            'isParent'     => true,
            'withChildren' => true,
            'withTags'     => true,
            'showOnSearch'     => false,
            'showInFilters'     => false,
            'tagsShowInFilters'     => false,
            'sortBy'        => null,
            'sortByOrientation' => 'desc',
            'perPage'       => 10,
            'pageNumber'    => 1,
        ], $options));

        $searchableFields = ['name', 'type'];

        /*
         * Slug
         */
        if ($isParent) {
            $query->where('parent_id', null);
        }
        if ($withChildren) {
            $query->with(['children']);
            if ($withTags) {
                $query->with(['children.tags' => function($q) use($tagsShowInFilters) {
                    if ($tagsShowInFilters) {
                        $q->where('show_in_filters', 1);
                    }
                }, 'children.tags.tag_image']);
            }
        }
        if ($withTags) {
            $query->with(['tags' => function($q) use($tagsShowInFilters) {
                if ($tagsShowInFilters ) {
                    $q->where('show_in_filters', 1);
                }
            }, 'tags.tag_image']);
        }
        if ($showOnSearch) {
            $query->where('show_on_search', 1);
        }
        if ($showInFilters) {
            $query->where('show_in_filters', 1);
        }
        if ($sortBy !== null) {
            $query->orderBy($sortBy, $sortByOrientation);
        }
        return $query->with('parent', 'tag_group_image')
            ->paginate(
                $perPage,
                $pageNumber
            );
    }

    public function scopeIsBadge($query)
    {
        return $query->where('type', 'badge');
    }

    protected static function boot()
    {
        parent::boot();

        static::created(function ($model) {
            Cache::delete('tagGroups');
        });

        static::updated(function ($model) {
            Cache::delete('tagGroups');
        });

        static::deleting(function ($model) {
            Cache::delete('tagGroups');
        });
    }
}
