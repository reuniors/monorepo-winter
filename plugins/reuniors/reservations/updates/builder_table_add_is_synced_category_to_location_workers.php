<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddIsSyncedCategoryToLocationWorkers extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_location_workers', function($table)
        {
            $table->tinyInteger('is_synced_category')->default(1)->after('is_synced_service');
        });
    }

    public function down()
    {
        Schema::table('reuniors_reservations_location_workers', function($table)
        {
            $table->dropColumn('is_synced_category');
        });
    }
}

