<?php namespace Reuniors\Base\Models;

use Model;
use October\Rain\Database\Traits\Sortable;

/**
 * Tag Model
 */
class Tag extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\SoftDelete;
    use Sortable;

    const SORT_ORDER = 'sort_order';

    protected $dates = ['deleted_at'];

    protected $jsonable = ['metadata', 'metadata_t'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_base_tags';

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
        'slug',
        'description',
        'metadata',
        'metadata_t',
        'tag_group_id',
        'sort_order',
        'show_on_search',
        'show_in_filters',
        'priority',
        'active',
        'number_of_words',
        'is_food_tag',
        'icon',
        'value',
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [
        'name' => 'required|string|max:191',
        'title' => 'required|string|max:191',
        'slug' => 'required|string|max:191|unique:reuniors_base_tags',
        'tag_group_id' => 'nullable|exists:reuniors_base_tag_groups,id',
        'sort_order' => 'integer',
        'show_on_search' => 'boolean',
        'show_in_filters' => 'boolean',
        'priority' => 'integer',
        'active' => 'boolean',
        'number_of_words' => 'nullable|integer',
        'is_food_tag' => 'boolean',
        'value' => 'nullable|numeric',
    ];

    /**
     * @var array Relations
     */
    public $belongsTo = [
        'tag_group' => ['Reuniors\Base\Models\TagGroup', 'order' => 'sort_order']
    ];

    public $belongsToMany = [
        'other_tag_groups' => [
            'Reuniors\Base\Models\TagGroup',
            'table' => 'reuniors_base_tags_other_tag_groups',
            'order' => 'sort_order'
        ],
    ];

    public $attachOne = [
        'tag_image' => ['System\Models\File', 'order' => 'sort_order', 'delete' => true],
    ];

    public function scopeListFrontEnd($query, $options)
    {
        /**
         * Default options
         * @var $tagSlug
         * @var $tagGroupSlug
         */
        extract(array_merge([
            'tagGroupSlug' => true,
            'tagSlug' => true,
        ], $options));

        if ($tagSlug) {
            $tagSlug = is_array($tagSlug) ? $tagSlug : [$tagSlug];
            $query->whereIn('slug', $tagSlug);
        }

        if ($tagGroupSlug) {
            $tagGroupSlug = is_array($tagGroupSlug) ? $tagGroupSlug : [$tagGroupSlug];
            $query->whereHas('tag_group', function($groupQuery) use ($tagGroupSlug) {
                $groupQuery->whereIn('slug', $tagGroupSlug);
            });
        }

        $query->with(['tag_image']);
    }

    public function scopeSearch($query, $options)
    {
        /**
         * Default options
         * @var $searchString
         * @var $tagGroupSlug
         */
        extract(array_merge([
            'searchString' => null,
            'limit' => 10,
        ], $options));

        if ($searchString !== null) {
            $query->where('name', 'like', "%$searchString%");
        }
    }

    public function beforeSave()
    {
        $slug = $this->slug;
        $slugExploded = explode('-', $slug);
        if ($this->number_of_words !== count($slugExploded)) {
            $this->number_of_words = count($slugExploded);
        }
    }
}
