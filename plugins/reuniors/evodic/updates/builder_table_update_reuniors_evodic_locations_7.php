<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicLocations7 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_evodic_locations', function($table)
        {
            $table->text('address_data')->nullable()->change();
            $table->text('phone_data')->nullable()->change();
            $table->double('address_lat', 10, 0)->nullable()->change();
            $table->double('address_long', 10, 0)->nullable()->change();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_evodic_locations', function($table)
        {
            $table->text('address_data')->nullable(false)->change();
            $table->text('phone_data')->nullable(false)->change();
            $table->double('address_lat', 10, 0)->nullable(false)->change();
            $table->double('address_long', 10, 0)->nullable(false)->change();
        });
    }
}
