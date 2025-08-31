<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocations4 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->integer('show_on_home')->unsigned()->default(1);
            $table->integer('show_on_home_global')->unsigned()->default(0);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->dropColumn('show_on_home');
            $table->dropColumn('show_on_home_global');
        });
    }
}
