<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddIsSyncedServiceToLocationWorkers extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_location_workers', function($table)
        {
            $table->tinyInteger('is_synced_service')->default(1);
        });
    }

    public function down()
    {
        Schema::table('reuniors_reservations_location_workers', function($table)
        {
            $table->dropColumn('is_synced_service');
        });
    }
}
