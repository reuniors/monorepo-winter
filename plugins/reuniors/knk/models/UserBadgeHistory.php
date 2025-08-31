<?php namespace Reuniors\Knk\Models;

use Model;
use Auth;
use October\Rain\Database\Traits\Validation;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Winter\Storm\Support\Str;

/**
 * Model
 */
class UserBadgeHistory extends Model
{
    use Validation;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_user_badges_history';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    protected $fillable = [
        'location_badge_history_id',
        'user_id',
    ];

    public $belongsTo = [
        'location_badge_history' => [
            'Reuniors\Knk\Models\LocationBadgeHistory'
        ],
        'user' => [
            'Reuniors\Knk\Models\User',
            'order' => 'name'
        ],
    ];

    public static function boot()
    {
        parent::boot();

        self::creating(function($model) {
            if ($model->id == null) {
                $model->id = Str::uuid();
            }
            $locationBadgeHistory = $model->location_badge_history;
            if (empty($locationBadgeHistory)) {
                throw new BadRequestHttpException('Location badge history is required');
            }
            $locationBadgeHistory->selected_count += 1;
            $locationBadgeHistory->save();
        });

        self::deleting(function($model) {
            $locationBadgeHistory = $model->location_badge_history;
            if (empty($locationBadgeHistory)) {
                throw new BadRequestHttpException('Location badge history is required');
            }
            $locationBadgeHistory->selected_count -= 1;
            if ($locationBadgeHistory->selected_count < 0) {
                $locationBadgeHistory->selected_count = 0;
            }
            $locationBadgeHistory->save();
        });
    }

    public static function updateBadges($locationId, $userId, $badges)
    {
        if (!isset($locationId, $userId, $badges)) {
            return false;
        }
        $locationData = Location::where('id', $locationId)->first();
        if (empty($locationData)) {
            return false;
        }
        $badgesTags = Tag::whereIn('name', $badges)
            ->get()
            ->keyBy('id');
        $badgesKeys = $badgesTags->keys()->toArray();
        $locationBadgesHistoryData = LocationBadgeHistory::where(
            [
                'location_id' => $locationId
            ])
            ->with(['user_badge_history' => function($query) use($userId) {
                $query->where('user_id', $userId);
            }])
            ->get()
            ->keyBy('tag_id');
        foreach ($badgesKeys as $tagId) {
            if (!isset($locationBadgesHistoryData[$tagId])) {
                $newLocationBadgeHistory = new LocationBadgeHistory();
                $newLocationBadgeHistory->location_id = $locationId;
                $newLocationBadgeHistory->tag_id = $tagId;
                $newLocationBadgeHistory->save();
                $newUserBadgeHistory = new self();
                $newUserBadgeHistory->location_badge_history_id = $newLocationBadgeHistory->id;
                $newUserBadgeHistory->user_id = $userId;
                $newUserBadgeHistory->save();
            } elseif (!isset($locationBadgesHistoryData[$tagId]->user_badge_history) || empty($locationBadgesHistoryData[$tagId]->user_badge_history)) {
                $newUserBadgeHistory = new self();
                $newUserBadgeHistory->location_badge_history_id = $locationBadgesHistoryData[$tagId]->id;
                $newUserBadgeHistory->user_id = $userId;
                $newUserBadgeHistory->save();
                $locationBadgesHistoryData[$tagId]->selected_count +=1 ;
                $locationBadgesHistoryData[$tagId]->save();
            }
        }
        foreach ($locationBadgesHistoryData as $tagId => $oneLocationBadgeHistory) {
            if (!in_array($tagId, $badgesKeys)) {
                if (isset($oneLocationBadgeHistory->user_badge_history) && !empty($oneLocationBadgeHistory->user_badge_history)) {
                    $userBadgeHistory = $oneLocationBadgeHistory->user_badge_history->first();
                    $userBadgeHistory->delete();
                    if ($oneLocationBadgeHistory->selected_count <= 1) {
                        $oneLocationBadgeHistory->delete();
                    } else {
                        $oneLocationBadgeHistory->selected_count -= 1;
                        $oneLocationBadgeHistory->save();
                    }
                }
            }
        }
    }

    public function scopeByUser($query)
    {
        if (Auth::check()) {
            $user = Auth::getUser();
            $query->where('user_id', $user->id);
        }
    }
}
