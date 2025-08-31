<?php
namespace Reuniors\Reservations\Models;

use Reuniors\Reservations\Classes\BaseModelWithSort;

/**
 * Model
 */
class ServiceGroup extends BaseModelWithSort
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_reservations_services_groups';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'title',
        'name',
        'slug',
        'description',
        'active',
        'type',
        'sort_order',
        'required',
        'min_selected',
        'max_selected',
    ];

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel'];

    public $translatable = [
        'title',
        'description',
    ];

    public $hasMany = [
        'services' => [
            'Reuniors\Reservations\Models\Service',
            'key' => 'group_id'
        ],
    ];

    public $belongsToMany = [
        'locations' => [
            'Reuniors\Reservations\Models\Location',
            'table' => 'reuniors_reservations_locations_services_groups',
            'key' => 'services_group_id',
            'otherKey' => 'location_id',
        ],
    ];

    /**
     * Apply conditions for sort order queries
     * Service groups are sorted globally, so no additional conditions needed
     */
    protected function applySortOrderConditions($query)
    {
        // Service groups are sorted globally, no additional conditions needed
        return $query;
    }

    public function getInputTypeOptions()
    {
        return [
            0 => 'Checkbox',
            1 => 'Radio',
            2 => 'Select',
        ];
    }

    public function getTypeOptions()
    {
        return [
            0 => 'Barber',
            1 => 'Restaurant',
        ];
    }

    public function scopeFeServiceGroups($query, array $options = [])
    {
        /**
         * @var $active bool
         * @var $locationSlug string
         * @var $withServices bool
         */
        extract([
            'active' => true,
            'locationSlug' => null,
            'withServices' => true,
            ...$options,
        ]);

        if ($active) {
            $query->where('active', true);
        }

        if ($locationSlug) {
            $query->whereHas('locations', function ($query) use ($locationSlug) {
                $query->where('slug', $locationSlug);
            });
        }

        if ($withServices) {
            $query->with('services');
        }

        return $query;
    }
}
