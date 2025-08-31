<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsWorkingHours2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_working_hours', function($table)
        {
            $table->time('pause_time_from')->nullable();
            $table->time('pause_time_to')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_working_hours', function($table)
        {
            $table->dropColumn('pause_time_from');
            $table->dropColumn('pause_time_to');
        });
    }
}
