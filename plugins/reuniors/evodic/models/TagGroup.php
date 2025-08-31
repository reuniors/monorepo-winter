<?php namespace Reuniors\Evodic\Models;

use Model;
use October\Rain\Database\Traits\Sortable;

/**
 * Model
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
        'location' => 'Apartmani',
        'badge' => 'Bedzevi',
        'destination' => 'Preporuke',
        'other' => 'Ostalo',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_evodic_tag_groups';

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
        'parent' => ['Reuniors\Evodic\Models\TagGroup', 'order' => 'sort_order']
    ];

    public $belongsToMany = [
        'placeTypes' => [
            'Reuniors\Evodic\Models\PlaceType',
            'table' => 'reuniors_evodic_place_types_tag_groups',
            'key' => 'tag_group_id',
            'otherKey' => 'place_type_id',
        ]
    ];

    public $hasMany = [
        'children' => [
            'Reuniors\Evodic\Models\TagGroup',
            'key' => 'parent_id',
            'order' => 'sort_order'
        ],
        'tags' => ['Reuniors\Evodic\Models\Tag']
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
}
