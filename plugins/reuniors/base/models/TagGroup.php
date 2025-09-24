<?php namespace Reuniors\Base\Models;

use Model;
use October\Rain\Database\Traits\Sortable;

/**
 * TagGroup Model
 */
class TagGroup extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\SoftDelete;
    use Sortable;

    const SORT_ORDER = 'sort_order';

    protected $dates = ['deleted_at'];

    protected $jsonable = ['metadata', 'metadata_t'];

    const COMBINE_TYPES = [
        0 => 'Combined',
        1 => 'Exclusively'
    ];

    const TYPES = [
        'location' => 'Location',
        'badge' => 'Badge',
        'destination' => 'Destination',
        'other' => 'Other',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_base_tag_groups';

    public $implement = ['@Winter.Translate.Behaviors.TranslatableModel'];
    public $translatable = [
        'name',
        'title',
        'description',
        ['slug', 'index' => true]
    ];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'name',
        'title',
        'description',
        'sort_order',
        'slug',
        'metadata',
        'metadata_t',
        'parent_id',
        'show_on_search',
        'show_in_filters',
        'combine_type',
        'type',
        'active',
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [
        'name' => 'required|string|max:191',
        'title' => 'required|string|max:191',
        'slug' => 'required|string|max:191|unique:reuniors_base_tag_groups',
        'type' => 'nullable|string|max:191',
        'parent_id' => 'nullable|exists:reuniors_base_tag_groups,id',
        'sort_order' => 'integer',
        'show_on_search' => 'boolean',
        'show_in_filters' => 'boolean',
        'combine_type' => 'boolean',
        'active' => 'boolean',
    ];

    /**
     * @var array Relations
     */
    public $belongsTo = [
        'parent' => ['Reuniors\Base\Models\TagGroup', 'order' => 'sort_order']
    ];

    public $hasMany = [
        'children' => [
            'Reuniors\Base\Models\TagGroup',
            'key' => 'parent_id',
            'order' => 'sort_order'
        ],
        'tags' => ['Reuniors\Base\Models\Tag']
    ];

    public $attachOne = [
        'tag_group_image' => ['System\Models\File', 'order' => 'sort_order', 'delete' => true],
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
         * @var $sortBy
         * @var $sortByOrientation
         * @var $perPage
         * @var $pageNumber
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
}
