<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsLocationWorkersShifts5 extends Migration
{
    public function up()
{
    Schema::table('reuniors_reservations_location_workers_shifts', function($table)
    {
        $table->integer('location_id')->unsigned();
        $table->foreign('location_id', 'res_loc_ws_location_id')
            ->constrained()
            ->cascadeOnDelete()
            ->references('id')
            ->on('reuniors_reservations_locations');
    });
}

public function down()
{
    Schema::table('reuniors_reservations_location_workers_shifts', function($table)
    {
        $table->dropColumn('location_id');
    });
}
}
