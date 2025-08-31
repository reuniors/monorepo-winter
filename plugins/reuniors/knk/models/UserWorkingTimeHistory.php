<?php namespace Reuniors\Knk\Models;

use Carbon\Carbon;
use Model;
use Reuniors\Knk\Classes\Casts\TimeCast;
use Winter\Storm\Support\Facades\DB;
use Winter\User\Models\User;

/**
 * Model
 * @property Carbon $date
 * @property Carbon $start_time
 * @property Carbon $end_time
 */
class UserWorkingTimeHistory extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at', 'date'];

    protected $casts = [
        'start_time' => TimeCast::class,
        'end_time' => TimeCast::class,
    ];

    const WORK_TIME_DIFF = 60 * 2; // 2 minutes

    const BY_MONTH = 'month';

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_user_working_time_history';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'date',
        'start_time',
        'end_time',
        'duration_in_sec',
    ];

    public $belongsTo = [
        'user' => [
            User::class,
        ],
    ];

    public function scopeToday($query)
    {
        $currentTimestamp = Carbon::today();
        return $query->whereDate('date', $currentTimestamp);
    }

    public function scopeBy($query, $by)
    {
        $query->join('users', 'users.id', '=', 'user_id');
        if ($by === self::BY_MONTH) {
            $query->addSelect([
                DB::raw('MONTH(date) as month'),
                DB::raw('YEAR(date) as year'),
                'duration_in_sec' => $query->raw('SUM(duration_in_sec) as duration_in_sec'),
                'users.name',
                'users.id as user_id'
            ]);

            $query
                ->groupBy('year', 'month', 'users.name', 'users.id')
                ->orderBy('year', 'desc')
                ->orderBy('month', 'desc');
        } else {
            $query->orderBy('date', 'desc');
        }
    }

    public function logWork(): void
    {
        $currentTimestamp = Carbon::now();

        if (!$this->id) {
            $this->start_time = $currentTimestamp;
            $this->end_time = $currentTimestamp;
            $this->date = $currentTimestamp->startOfDay();

            $this->end_time = $this->end_time->addSeconds(self::WORK_TIME_DIFF);
            $this->duration_in_sec = self::WORK_TIME_DIFF;
            $this->save();
            return;
        }

        if ($this->end_time->gt($currentTimestamp)) {
            $this->duration_in_sec += self::WORK_TIME_DIFF - abs($this->end_time->diffInSeconds($currentTimestamp));
        } else {
            $this->duration_in_sec += self::WORK_TIME_DIFF;
        }
        $this->end_time = $currentTimestamp->addSeconds(self::WORK_TIME_DIFF);

        $this->save();
    }
}
