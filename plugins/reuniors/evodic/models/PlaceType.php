<?php namespace Reuniors\Evodic\Models;

use Model;
use reuniors\evodic\Enums\PlaceTypeCategory;

/**
 * Model
 */
class PlaceType extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    use \Winter\Storm\Database\Traits\SoftDelete;

    public $implement = ['@Winter.Translate.Behaviors.TranslatableModel'];
    public array $translatable = [
        'title',
    ];

    protected $dates = ['deleted_at'];

    const CATEGORIES = [
        PlaceTypeCategory::CATEGORY_RESTAURANT,
        PlaceTypeCategory::CATEGORY_GO_OUT,
        PlaceTypeCategory::CATEGORY_HOTEL,
        PlaceTypeCategory::CATEGORY_SHOP,
        PlaceTypeCategory::CATEGORY_ATTRACTION,
        PlaceTypeCategory::CATEGORY_EVENT,
        PlaceTypeCategory::CATEGORY_TRANSPORT,
        PlaceTypeCategory::CATEGORY_OTHER,
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_evodic_place_types';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    protected $fillable = [
        'title',
        'name',
        'is_active',
        'description',
        'metadata',
        'category_code',
        'icon',
    ];

    public $jsonable = [
        'metadata'
    ];

    public $hasMany = [
        'places' => [
            Place::class,
        ]
    ];

    public $belongsToMany = [
        'tagGroups' => [
            TagGroup::class,
            'table' => 'reuniors_evodic_place_types_tag_groups',
            'key' => 'place_type_id',
            'otherKey' => 'tag_group_id',
        ]
    ];

    public function scopeLocationPlaceTypes($query, $options = [])
    {
        /**
         * @var string $locationSlug
         * @var bool $active
         */
        extract(array_merge([
            'locationSlug' => null,
            'active' => true,
        ], $options));

        if ($locationSlug) {
            $query->whereHas('places.locations', function ($query) use ($locationSlug, $active) {
                $query->where('slug', $locationSlug);

            });
        }
        if ($active) {
            $query->where('is_active', true);
        }

        return $query;
    }
}
