<?php namespace Reuniors\Base\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class AddUniqueConstraintToConnectedDevices extends Migration
{
    public function up()
    {
        // First, run consolidation to remove duplicates
        \Artisan::call('reuniors:consolidate-connected-devices');
        
        // Then add unique constraint
        Schema::table('reuniors_base_connected_devices', function ($table) {
            $table->unique(['user_id', 'location_slug'], 'user_location_unique');
        });
    }

    public function down()
    {
        Schema::table('reuniors_base_connected_devices', function ($table) {
            $table->dropUnique('user_location_unique');
        });
    }
}

