<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsLocationWorkersShifts3 extends Migration
{
    public function up()
{
    Schema::table('reuniors_reservations_location_workers_shifts', function($table)
    {
        $table->date('date');
    });
}

public function down()
{
    Schema::table('reuniors_reservations_location_workers_shifts', function($table)
    {
        $table->dropColumn('date');
    });
}
}
