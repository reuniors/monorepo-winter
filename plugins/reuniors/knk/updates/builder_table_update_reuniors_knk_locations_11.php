<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocations11 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->double('address_lat', 10, 0)->nullable();
            $table->double('address_long', 10, 0)->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->dropColumn('address_lat');
            $table->dropColumn('address_long');
        });
    }
}
