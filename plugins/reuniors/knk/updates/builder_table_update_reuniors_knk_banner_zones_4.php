<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkBannerZones4 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_banner_zones', function($table)
        {
            $table->dropColumn('category_id');
            $table->dropColumn('url');
            $table->dropColumn('city_id');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_banner_zones', function($table)
        {
            $table->integer('category_id')->nullable()->unsigned();
            $table->string('url', 191)->nullable();
            $table->integer('city_id')->nullable()->unsigned();
        });
    }
}
