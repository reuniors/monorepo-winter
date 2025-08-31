<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsLocationWorkersShifts extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_location_workers_shifts', function($table)
        {
            $table->increments('id')->unsigned();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_location_workers_shifts', function($table)
        {
            $table->dropColumn('id');
        });
    }
}
