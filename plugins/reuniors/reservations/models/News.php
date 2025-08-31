<?php

namespace Reuniors\Reservations\Models;

use Winter\Storm\Database\Traits\Validation;
use Model;

/**
 * News Model
 */
class News extends Model
{
    use Validation;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_reservations_news';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'title' => 'required|string|max:255',
        'description' => 'required|string|max:1000',
        'level' => 'required|integer|between:1,10',
        'type' => 'required|in:news,chyron,alert',
        'status' => 'required|in:draft,pending,approved',
        'location_id' => 'required|exists:reuniors_reservations_locations,id',
    ];

    protected $fillable = [
        'id',
        'title',
        'description',
        'level',
        'type',
        'status',
        'location_id',
        'activated_at',
        'deactivated_at',
    ];

    protected $dates = [
        'activated_at',
        'deactivated_at',
        'created_at',
        'updated_at',
    ];

    public $belongsTo = [
        'location' => [
            'Reuniors\Reservations\Models\Location',
            'key' => 'location_id',
        ],
    ];

    /**
     * Boot the model and set UUID
     */
    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) \Str::uuid();
            }
        });
    }

    /**
     * Scope for active news
     */
    public function scopeActive($query)
    {
        return $query
            ->where('status', 'approved')
            ->where(function ($query) {
                $now = now();
                $query
                    ->whereNull('activated_at')
                    ->orWhere('activated_at', '<=', $now);
            })
            ->where(function ($query) {
                $now = now();
                $query
                    ->whereNull('deactivated_at')
                    ->orWhere('deactivated_at', '>=', $now);
            });
    }

    /**
     * Scope for news by location
     */
    public function scopeByLocation($query, $locationId)
    {
        return $query->where('location_id', $locationId);
    }

    /**
     * Scope for news by type
     */
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope for news by status
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Get importance level label
     */
    public function getLevelLabelAttribute()
    {
        $levels = [
            1 => 'Very Low',
            2 => 'Low',
            3 => 'Below Average',
            4 => 'Average',
            5 => 'Above Average',
            6 => 'Moderate',
            7 => 'High',
            8 => 'Very High',
            9 => 'Critical',
            10 => 'Emergency',
        ];

        return $levels[$this->level] ?? 'Unknown';
    }

    /**
     * Get type label
     */
    public function getTypeLabelAttribute()
    {
        $types = [
            'news' => 'News',
            'chyron' => 'Chyron',
            'alert' => 'Alert',
        ];

        return $types[$this->type] ?? 'Unknown';
    }

    /**
     * Get status label
     */
    public function getStatusLabelAttribute()
    {
        $statuses = [
            'draft' => 'Draft',
            'pending' => 'Pending',
            'approved' => 'Approved',
        ];

        return $statuses[$this->status] ?? 'Unknown';
    }
}
