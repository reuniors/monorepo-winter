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

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel'];
    public $translatable = [
        'name',
        'description',
        ['slug', 'index' => true]
    ];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'name',
        'description',
        'color',
        'sort_order',
        'slug',
        'metadata',
        'tag_group_id',
        'metadata_t',
        'show_on_search',
        'priority',
        'show_in_filters',
        'active',
        'number_of_words',
        'is_food_tag',
        'icon',
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [
        'name' => 'required|string|max:255',
        'slug' => 'required|unique:reuniors_base_tags',
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
