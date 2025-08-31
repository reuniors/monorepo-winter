<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsLocationWorkersShifts4 extends Migration
{
    public function up()
{
    Schema::table('reuniors_reservations_location_workers_shifts', function($table)
    {
        $table->time('time_from');
        $table->time('time_to');
        $table->time('pause_time_from')->nullable();
        $table->time('pause_time_to')->nullable();
    });
}

public function down()
{
    Schema::table('reuniors_reservations_location_workers_shifts', function($table)
    {
        $table->dropColumn('time_from');
        $table->dropColumn('time_to');
        $table->dropColumn('pause_time_from');
        $table->dropColumn('pause_time_to');
    });
}
}
