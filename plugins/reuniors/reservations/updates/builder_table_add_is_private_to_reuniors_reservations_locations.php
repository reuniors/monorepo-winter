<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddIsPrivateToReuniorsReservationsLocations extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_locations', function($table)
        {
            $table->boolean('is_private')->default(0)->after('active');
        });
    }

    public function down()
    {
        Schema::table('reuniors_reservations_locations', function($table)
        {
            $table->dropColumn('is_private');
        });
    }
}

