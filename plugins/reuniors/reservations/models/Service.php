<?php
namespace Reuniors\Reservations\Models;

use Reuniors\Reservations\Classes\BaseModelWithSort;

/**
 * Model
 */
class Service extends BaseModelWithSort
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_reservations_services';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'group_id',
        'title',
        'name',
        'slug',
        'description',
        'active',
        'duration',
        'price',
        'currency',
        'sort_order',
    ];

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel'];

    public $translatable = [
        'title',
        'description',
    ];

    public $belongsTo = [
        'service_group' => ['Reuniors\Reservations\Models\ServiceGroup', 'key' => 'group_id'],
    ];

    /**
     * Apply conditions for sort order queries
     * Services are sorted within their group, so we need to filter by group_id
     */
    protected function applySortOrderConditions($query)
    {
        if ($this->group_id) {
            $query->where('group_id', $this->group_id);
        }
        return $query;
    }

    public function getCurrencyOptions()
    {
        return [
            0 => 'RSD',
            1 => 'EUR',
        ];
    }
}
