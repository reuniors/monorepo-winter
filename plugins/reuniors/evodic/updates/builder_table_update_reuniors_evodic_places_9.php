<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicPlaces9 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_evodic_places', function($table)
        {
            $table->string('google_map_url', 300)->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_evodic_places', function($table)
        {
            $table->dropColumn('google_map_url');
        });
    }
}
