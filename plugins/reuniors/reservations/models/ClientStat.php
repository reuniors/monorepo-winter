<?php

namespace Reuniors\Reservations\Models;

use Model;

class ClientStat extends Model
{
    protected $table = 'reuniors_reservations_client_stats';

    protected $fillable = [
        'client_id',
        'location_id',
        'total_reservations',
        'confirmed_reservations_count',
        'canceled_reservations_count',
        'last_visit',
        'cost_sum',
    ];
}
