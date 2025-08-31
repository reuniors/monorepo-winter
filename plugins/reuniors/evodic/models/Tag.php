<?php namespace Reuniors\Evodic\Models;

use Model;
use October\Rain\Database\Traits\Sortable;

/**
 * Model
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
    public $table = 'reuniors_evodic_tags';

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
        'slug' => 'required|unique:reuniors_evodic_tags',
    ];

    public $attachOne = [
        'tag_image' => ['System\Models\File', 'order' => 'sort_order', 'delete' => true],
    ];

    public $belongsTo = [
        'tag_group' => ['Reuniors\Evodic\Models\TagGroup', 'order' => 'sort_order']
    ];

    public $belongsToMany = [
        'other_tag_groups' => [
            'Reuniors\Evodic\Models\TagGroup',
            'table' => 'reuniors_evodic_tags_other_tag_groups',
            'order' => 'sort_order'
        ],
        'places' => [
            'Reuniors\Evodic\Models\Place',
            'table' => 'reuniors_evodic_places_tags',
            'key' => 'tag_id',
            'otherKey' => 'place_id',
        ],
    ];

    public function scopeListFrontEnd($query, $options)
    {
        /**
         * Default options
         * @var $tagSlug
         * @var $tagGroupSlug
         *
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
         *
         */
        extract(array_merge([
            'searchString' => null,
            'limit' => 10,
        ], $options));

        if ($searchString !== null) {
            $query->where('title', 'like', "%$searchString%");
        }
    }

    public static function tagFixSlugNameTitle($slug)
    {
        $newTag = [];
        if (\Str::contains($slug, '-it-')) {
            $slugExploded = explode('-', $slug);
            foreach ($slugExploded as $slugPart) {
                if ($slugPart == 'it') {
                    break;
                }
                $newTag[] = $slugPart;
            }
        }
        if (!empty($newTag)) {
            $slug = implode('-', $newTag);
        }
        if (preg_match('/\\d/', $slug) > 0) {
            $newTagTemp = [];
            $slugExploded = explode('-', $slug);
            $isFirst = true;
            $hasNumbers = false;
            foreach ($slugExploded as $slugPart) {
                if (!$isFirst && preg_match('/\\d/', $slugPart) > 0) {
                    $hasNumbers = true;
                    break;
                }
                $isFirst = false;
                $newTagTemp[] = $slugPart;
            }
            if ($hasNumbers && !empty($newTagTemp)) {
                $newTag = $newTagTemp;
            }
        }
        if (!empty($newTag)) {
            $slug = implode('-', $newTag);
            $title = ucfirst(implode(' ', $newTag));
            return [
                'slug' => $slug,
                'title' => $title,
            ];
        }
        return null;
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
