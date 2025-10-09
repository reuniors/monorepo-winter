<?php namespace Reuniors\Botovi\Models;

use Model;
use Winter\Storm\Database\Traits\SoftDelete;
use Winter\Storm\Database\Traits\Validation;
use Winter\Storm\Database\Traits\NestedTree;
use System\Models\File;

/**
 * Person Model
 */
class Person extends Model
{
    use Validation;
    use SoftDelete;

    protected $dates = ['deleted_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_botovi_people';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'city_id' => 'required|integer|exists:reuniors_base_cities,id',
        'birth_city_id' => 'nullable|integer|exists:reuniors_base_cities,id',
        'jmbg' => 'nullable|string|size:13|unique:reuniors_botovi_people,jmbg',
        'main_category_id' => 'required|integer|exists:reuniors_botovi_categories,id',
        'type' => 'required|in:bot,cacija,neutral',
        'status' => 'in:pending,approved,rejected,active,inactive',
    ];

    protected $fillable = [
        'first_name',
        'last_name',
        'city_id',
        'birth_city_id',
        'address',
        'jmbg',
        'parent_names',
        'children_names',
        'birth_date',
        'main_category_id',
        'type',
        'status',
        'description',
        'snippet',
        'slug',
        'active',
        'active_at',
        'deactivate_at',
        'is_verified',
        'verification_date',
        'verification_notes',
        'metadata',
        'other_data',
        'social_media_data',
        'contact_data',
        'professional_data',
        'criminal_record_data',
        'family_data',
        'education_data',
        'health_data',
        'financial_data',
        'political_affiliation_data',
        'public_opinion_data',
        'media_mentions_data',
        'events_data',
        'relationships_data',
        'tags_data',
        'created_by',
        'approved_by',
        'rejected_by',
        'rejection_reason',
        'last_updated_by',
        'priority_level',
        'risk_level',
        'influence_level',
        'public_visibility',
        'search_visibility',
        'admin_notes',
        'last_activity_at',
        'update_count',
            'view_count',
            'like_count',
            'dislike_count',
            'report_count',
            'flag_count',
            'reviews_count',
            'rating_average',
    ];

    protected $casts = [
        'active' => 'boolean',
        'is_verified' => 'boolean',
        'public_visibility' => 'boolean',
        'search_visibility' => 'boolean',
        'birth_date' => 'date',
        'active_at' => 'datetime',
        'deactivate_at' => 'datetime',
        'verification_date' => 'datetime',
        'last_activity_at' => 'datetime',
    ];

    public $jsonable = [
        'metadata',
        'other_data',
        'social_media_data',
        'contact_data',
        'professional_data',
        'criminal_record_data',
        'family_data',
        'education_data',
        'health_data',
        'financial_data',
        'political_affiliation_data',
        'public_opinion_data',
        'media_mentions_data',
        'events_data',
        'relationships_data',
        'tags_data',
    ];

    public $belongsTo = [
        'city' => ['Reuniors\Base\Models\City'],
        'birth_city' => ['Reuniors\Base\Models\City', 'key' => 'birth_city_id'],
        'main_category' => ['Reuniors\Botovi\Models\Category'],
        'creator' => ['Winter\User\Models\User', 'key' => 'created_by'],
        'approver' => ['Winter\User\Models\User', 'key' => 'approved_by'],
        'rejector' => ['Winter\User\Models\User', 'key' => 'rejected_by'],
        'last_updater' => ['Winter\User\Models\User', 'key' => 'last_updated_by'],
    ];

    public $belongsToMany = [
        'categories' => [
            'Reuniors\Botovi\Models\Category',
            'table' => 'reuniors_botovi_people_categories',
            'key' => 'person_id',
            'otherKey' => 'category_id',
        ],
        'groups' => [
            'Reuniors\Botovi\Models\Group',
            'table' => 'reuniors_botovi_people_groups',
            'key' => 'person_id',
            'otherKey' => 'group_id',
        ],
        'tags' => [
            'Reuniors\Base\Models\Tag',
            'table' => 'reuniors_botovi_people_tags',
            'key' => 'person_id',
            'otherKey' => 'tag_id',
        ],
        'related_people' => [
            'Reuniors\Botovi\Models\Person',
            'table' => 'reuniors_botovi_people_relationships',
            'key' => 'person_id',
            'otherKey' => 'related_person_id',
        ],
    ];

    public $hasMany = [
        'events' => ['Reuniors\Botovi\Models\Event'],
        'notifications' => ['Reuniors\Botovi\Models\Notification'],
        'reports' => ['Reuniors\Botovi\Models\PersonReport'],
        'flags' => ['Reuniors\Botovi\Models\PersonFlag'],
        'views' => ['Reuniors\Botovi\Models\PersonView'],
        'comments' => ['Reuniors\Botovi\Models\PersonComment'],
        'reviews' => ['Reuniors\Botovi\Models\PersonReview'],
        'activity_log' => ['Reuniors\Botovi\Models\PersonActivityLog'],
        'statistics' => ['Reuniors\Botovi\Models\PersonStatistics'],
        'export_logs' => ['Reuniors\Botovi\Models\PersonExportLog'],
    ];

    public $attachOne = [
        'avatar' => ['System\Models\File', 'delete' => true],
        'cover_image' => ['System\Models\File', 'delete' => true],
    ];

    public $attachMany = [
        'gallery' => ['System\Models\File', 'delete' => true, 'order' => 'sort_order'],
        'documents' => ['System\Models\File', 'delete' => true, 'order' => 'sort_order'],
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByCategory($query, $categoryId)
    {
        return $query->whereHas('categories', function($q) use ($categoryId) {
            $q->where('id', $categoryId);
        });
    }

    public function scopeByCity($query, $cityId)
    {
        return $query->where('city_id', $cityId);
    }

    public function scopeSearch($query, $search)
    {
        return $query->where(function($q) use ($search) {
            $q->where('first_name', 'like', '%' . $search . '%')
              ->orWhere('last_name', 'like', '%' . $search . '%')
              ->orWhere('description', 'like', '%' . $search . '%');
        });
    }

    public function scopeOrderByPopularity($query)
    {
        return $query->orderBy('view_count', 'desc')
                    ->orderBy('like_count', 'desc');
    }

    // Business logic methods
    public function approve($userId, $adminNotes = null)
    {
        $this->status = 'approved';
        $this->active = true;
        $this->approved_by = $userId;
        $this->admin_notes = $adminNotes;
        $this->active_at = now();
        $this->save();
    }

    public function reject($userId, $rejectionReason, $adminNotes = null)
    {
        $this->status = 'rejected';
        $this->active = false;
        $this->rejected_by = $userId;
        $this->rejection_reason = $rejectionReason;
        $this->admin_notes = $adminNotes;
        $this->save();
    }

    public function deactivate($reason, $adminNotes = null)
    {
        $this->active = false;
        $this->status = 'inactive';
        $this->deactivate_at = now();
        $this->admin_notes = $adminNotes;
        $this->save();
    }

    public function activate()
    {
        $this->active = true;
        $this->status = 'active';
        $this->active_at = now();
        $this->save();
    }

    public function verify($verificationNotes = null)
    {
        $this->is_verified = true;
        $this->verification_date = now();
        $this->verification_notes = $verificationNotes;
        $this->save();
    }

    // Accessors
    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function getIsBotAttribute()
    {
        return $this->type === 'bot';
    }

    public function getIsCacijaAttribute()
    {
        return $this->type === 'cacija';
    }

    public function getIsNeutralAttribute()
    {
        return $this->type === 'neutral';
    }

    // Boot method
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = \Str::slug($model->first_name . ' ' . $model->last_name);
            }
        });
    }
}
