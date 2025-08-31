<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicLocationOwners2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_evodic_location_owners', function($table)
        {
            $table->text('phone_data')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_evodic_location_owners', function($table)
        {
            $table->dropColumn('phone_data');
        });
    }
}
