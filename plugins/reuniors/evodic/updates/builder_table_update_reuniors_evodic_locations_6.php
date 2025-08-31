<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicLocations6 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_evodic_locations', function($table)
        {
            $table->text('address_data');
            $table->text('phone_data');
            $table->double('address_lat', 10, 0);
            $table->double('address_long', 10, 0);
            $table->string('snippet', 10000)->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_evodic_locations', function($table)
        {
            $table->dropColumn('address_data');
            $table->dropColumn('phone_data');
            $table->dropColumn('address_lat');
            $table->dropColumn('address_long');
            $table->dropColumn('snippet');
        });
    }
}
