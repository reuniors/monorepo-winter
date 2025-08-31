<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsLocationWorkers extends Migration
{
    public function up()
{
    Schema::table('reuniors_reservations_location_workers', function($table)
    {
        $table->string('level')->nullable();
    });
}

public function down()
{
    Schema::table('reuniors_reservations_location_workers', function($table)
    {
        $table->dropColumn('level');
    });
}
}
