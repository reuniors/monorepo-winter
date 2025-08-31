<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkRegionCity3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_region_city', function($table)
        {
            $table->integer('country_id')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_region_city', function($table)
        {
            $table->integer('country_id')->nullable(false)->change();
        });
    }
}
