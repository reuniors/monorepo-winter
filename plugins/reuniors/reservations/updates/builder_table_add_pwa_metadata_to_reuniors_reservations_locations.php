<?php namespace Reuniors\Reservations\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableAddPwaMetadataToReuniorsReservationsLocations extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_locations', function($table)
        {
            $table->text('pwa_metadata')->nullable()->after('settings');
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_locations', function($table)
        {
            $table->dropColumn('pwa_metadata');
        });
    }
}

