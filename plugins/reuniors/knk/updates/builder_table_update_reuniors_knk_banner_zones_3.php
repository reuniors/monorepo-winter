<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkBannerZones3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_banner_zones', function($table)
        {
            $table->dropColumn('location_id');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_banner_zones', function($table)
        {
            $table->integer('location_id')->unsigned();
        });
    }
}
