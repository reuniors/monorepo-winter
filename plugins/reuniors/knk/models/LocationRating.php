<?php namespace Reuniors\Knk\Models;

use Model;
use October\Rain\Database\Traits\Validation;

/**
 * Model
 */
class LocationRating extends Model
{
    use Validation;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_location_ratings';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    protected $fillable = [
        'location_id',
        'rating_type',
        'grade',
        'counter',
    ];

    public static $ratingTypes = [
        'general' => [
            'label' => 'Opšta',
            'backgroundColor' => 'rgba(255, 0, 0, 0.5)',
        ],
        'ambiance' => [
            'label' => 'Ambijent',
            'backgroundColor' => 'rgba(223, 36, 38, 0.4)',
        ],
        'atmosphere' => [
            'label' => 'Atmosfera',
            'backgroundColor' => 'rgba(56, 53, 56, 1)',
            // 'backgroundColor' => 'rgba(100, 255, 0, 0.5)',
        ],
        'food' => [
            'label' => 'Hrana',
            'backgroundColor' => 'rgba(223, 36, 38, 1)',
            // 'backgroundColor' => 'rgba(200, 50, 255, 0.5)',
        ],
        'hygiene' => [
            'label' => 'Higijena',
            'backgroundColor' => 'rgba(56, 53, 56, 0.8)',
            // 'backgroundColor' => 'rgba(0, 100, 255, 0.5)',
        ],
        'pricing' => [
            'label' => 'Cene',
            'backgroundColor' => 'rgba(223, 36, 38, 0.8)',
            // 'backgroundColor' => 'rgba(25, 25, 100, 0.5)',
        ],
        'service' => [
            'label' => 'Usluga',
            'backgroundColor' => 'rgba(56, 53, 56, 0.4)',
            // 'backgroundColor' => 'rgba(255, 255, 0, 0.5)',
        ],
    ];

    public static $validRatings = [
        5, 6, 7, 8, 9, 10
    ];

    public $hasMany = [
        'location_rating_histories' => [
            'Reuniors\Knk\Models\LocationRatingHistory',
            'key' => 'location_rating_id'
        ],
    ];

    public $hasOne = [
        'location_rating_history' => [
            'Reuniors\Knk\Models\LocationRatingHistory',
            'key' => 'location_rating_id',
            'scope' => 'byUser'
        ],
    ];
}
