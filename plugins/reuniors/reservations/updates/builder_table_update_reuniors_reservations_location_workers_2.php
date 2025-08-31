<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsLocationWorkers2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_location_workers', function($table)
        {
            $table->integer('level')->nullable()->unsigned(false)->default(null)->change();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_location_workers', function($table)
        {
            $table->string('level', 255)->nullable()->unsigned(false)->default(null)->change();
        });
    }
}
