<?php namespace Reuniors\Knk\Models;

use Model;
use Reuniors\Knk\Classes\Enums\NeedUpdateTypeEnum;
use Winter\Storm\Database\Traits\Validation;

/**
 * Model
 */
class NeedUpdate extends Model
{
    use Validation;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_need_updates';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    const AVAILABLE_TYPES = [NeedUpdateTypeEnum::LOCATION];

    protected $fillable = [
        'attachment_id',
        'attachment_type',
    ];

    public $belongsTo = [
        'location' => [
            NeedUpdateTypeEnum::LOCATION, 'key' => 'attachment_id', 'conditions' => 'attachment_type = "location"'
        ],
    ];

    public static function createForLocation($locationId): self
    {
        $existing = self::where('attachment_id', $locationId)
            ->where('attachment_type', NeedUpdateTypeEnum::LOCATION)
            ->first();
        if ($existing) {
            return $existing;
        }
        $needUpdate = new self();
        $needUpdate->attachment_id = $locationId;
        $needUpdate->attachment_type = NeedUpdateTypeEnum::LOCATION;
        $needUpdate->save();
        return $needUpdate;
    }
}
