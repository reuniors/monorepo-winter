<?php namespace Reuniors\Calendar\Models;

use Model;
use Illuminate\Support\Facades\Crypt;

/**
 * CalendarConnection Model
 * Generic calendar connection for any provider (Google, Apple, Outlook, etc.)
 */
class CalendarConnection extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at', 'token_expires_at', 'webhook_expires_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_calendar_connections';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'provider' => 'required|in:google',
        'provider_email' => 'required|email',
        'access_token' => 'required',
    ];

    protected $fillable = [
        'provider',
        'provider_calendar_id',
        'provider_email',
        'access_token',
        'refresh_token',
        'token_expires_at',
        'webhook_channel_id',
        'webhook_resource_id',
        'webhook_channel_token',
        'webhook_expires_at',
        'is_active',
        'sync_to_provider',
        'sync_from_provider',
        'block_overlapping_slots',
        'allow_overlapping_with_approval',
        'settings',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sync_to_provider' => 'boolean',
        'sync_from_provider' => 'boolean',
        'block_overlapping_slots' => 'boolean',
        'allow_overlapping_with_approval' => 'boolean',
        'settings' => 'array',
    ];

    public $hasMany = [
        'calendarEvents' => [
            'Reuniors\Calendar\Models\CalendarEvent',
            'key' => 'calendar_connection_id',
        ],
    ];

    /**
     * Polymorphic relation to entity-specific connections (e.g., ReservationCalendarConnection)
     */
    public function reservationsConnections()
    {
        return $this->hasMany('Reuniors\Reservations\Models\ReservationCalendarConnection', 'calendar_connection_id');
    }

    /**
     * Accessor for encrypted access_token
     */
    public function getAccessTokenAttribute($value)
    {
        if (empty($value)) {
            return null;
        }
        try {
            return Crypt::decryptString($value);
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Mutator for encrypted access_token
     */
    public function setAccessTokenAttribute($value)
    {
        if (!empty($value)) {
            $this->attributes['access_token'] = Crypt::encryptString($value);
        }
    }

    /**
     * Accessor for encrypted refresh_token
     */
    public function getRefreshTokenAttribute($value)
    {
        if (empty($value)) {
            return null;
        }
        try {
            return Crypt::decryptString($value);
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Mutator for encrypted refresh_token
     */
    public function setRefreshTokenAttribute($value)
    {
        if (!empty($value)) {
            $this->attributes['refresh_token'] = Crypt::encryptString($value);
        } else {
            $this->attributes['refresh_token'] = null;
        }
    }

    /**
     * Check if token is expired
     */
    public function isTokenExpired()
    {
        if (!$this->token_expires_at) {
            return true;
        }
        return $this->token_expires_at->isPast();
    }

    /**
     * Scope for active connections
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for provider
     */
    public function scopeProvider($query, $provider)
    {
        return $query->where('provider', $provider);
    }
}

