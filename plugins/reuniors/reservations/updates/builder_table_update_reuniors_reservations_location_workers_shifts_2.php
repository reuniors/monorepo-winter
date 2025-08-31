<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsLocationWorkersShifts2 extends Migration
{
    public function up()
{
    Schema::table('reuniors_reservations_location_workers_shifts', function($table)
    {
        $table->dropForeign('res_pl_wh_working_day_id');
        $table->dropColumn('working_day_id');
    });
}

public function down()
{
    Schema::table('reuniors_reservations_location_workers_shifts', function($table)
    {
        $table->integer('working_day_id')->unsigned();
            $table->foreign('working_day_id', 'res_pl_wh_working_day_id')
        ->constrained()
        ->cascadeOnDelete()
        ->references('id')
        ->on('reuniors_reservations_working_days');
    });
}
}
