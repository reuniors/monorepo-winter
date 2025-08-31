<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsWorkingHours extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_working_hours', function($table)
        {
            $table->smallInteger('shift')->default(1);
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_working_hours', function($table)
        {
            $table->dropColumn('shift');
        });
    }
}
