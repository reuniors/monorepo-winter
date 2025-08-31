<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkRegionCity5 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_region_city', function($table)
        {
            $table->renameColumn('city_id', 'parent_city_id');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_region_city', function($table)
        {
            $table->renameColumn('parent_city_id', 'city_id');
        });
    }
}
