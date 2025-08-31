<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsLocationWorkers3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_location_workers', function($table)
        {
            $table->text('description')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_location_workers', function($table)
        {
            $table->dropColumn('description');
        });
    }
}
