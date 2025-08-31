<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkBannerZones2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_banner_zones', function($table)
        {
            $table->integer('city_id')->nullable()->unsigned();
            $table->integer('location_id')->unsigned();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_banner_zones', function($table)
        {
            $table->dropColumn('city_id');
            $table->dropColumn('location_id');
        });
    }
}
