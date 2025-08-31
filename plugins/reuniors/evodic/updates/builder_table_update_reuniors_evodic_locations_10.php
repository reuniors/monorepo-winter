<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicLocations10 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_evodic_locations', function($table)
        {
            $table->string('google_map_url')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_evodic_locations', function($table)
        {
            $table->dropColumn('google_map_url');
        });
    }
}
