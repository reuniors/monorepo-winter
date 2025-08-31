<?php

namespace Reuniors\Reservations\Models;

use Model;

class WorkerStat extends Model
{
    protected $table = 'reuniors_reservations_worker_stats';

    protected $fillable = [
        'worker_id',
        'location_id',
        'total_reservations',
        'confirmed_reservations_count',
        'canceled_reservations_count',
        'last_visit',
        'cost_sum',
    ];
}
