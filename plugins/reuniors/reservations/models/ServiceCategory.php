<?php
namespace Reuniors\Reservations\Models;

use Model;

/**
 * ServiceCategory Model
 */
class ServiceCategory extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_reservations_service_categories';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'title' => 'required|string|max:255',
        'slug' => 'required|string|max:255|unique:reuniors_reservations_service_categories',
        'location_id' => 'required|integer|exists:reuniors_reservations_locations,id',
    ];

    protected $fillable = [
        'location_id',
        'title',
        'slug',
        'description',
        'active',
        'sort_order',
    ];

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel'];

    public $translatable = [
        'title',
        'description',
    ];

    public $belongsTo = [
        'location' => [
            'Reuniors\Reservations\Models\Location',
            'key' => 'location_id',
        ],
    ];

    public $belongsToMany = [
        'serviceGroups' => [
            'Reuniors\Reservations\Models\ServiceGroup',
            'table' => 'reuniors_reservations_service_category_group',
            'key' => 'service_category_id',
            'otherKey' => 'service_group_id',
        ],
    ];

    public $attachOne = [
        'image' => ['Reuniors\Reservations\Models\FileImage\FileImageSquare', 'delete' => true],
    ];
}

