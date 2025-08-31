<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocations6 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->smallInteger('has_delivery')->unsigned()->default(0);
            $table->smallInteger('has_online_delivery')->unsigned()->default(0);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->dropColumn('has_delivery');
            $table->dropColumn('has_online_delivery');
        });
    }
}
