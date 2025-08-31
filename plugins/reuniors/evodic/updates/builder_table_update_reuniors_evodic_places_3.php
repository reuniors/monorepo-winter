<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicPlaces3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_evodic_places', function($table)
        {
            $table->string('slug');
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_evodic_places', function($table)
        {
            $table->dropColumn('slug');
        });
    }
}
