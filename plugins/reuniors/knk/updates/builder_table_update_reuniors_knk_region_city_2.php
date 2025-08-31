<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkRegionCity2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_region_city', function($table)
        {
            $table->bigInteger('sort_order')->default(0);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_region_city', function($table)
        {
            $table->dropColumn('sort_order');
        });
    }
}
