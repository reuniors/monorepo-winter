<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkBanners5 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_banners', function($table)
        {
            $table->integer('connected_location_id')->nullable()->unsigned();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_banners', function($table)
        {
            $table->dropColumn('connected_location_id');
        });
    }
}
