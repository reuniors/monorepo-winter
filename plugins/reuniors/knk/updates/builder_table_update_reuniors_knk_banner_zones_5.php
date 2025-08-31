<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkBannerZones5 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_banner_zones', function($table)
        {
            $table->text('metadata');
            $table->text('image_meta');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_banner_zones', function($table)
        {
            $table->dropColumn('metadata');
            $table->dropColumn('image_meta');
        });
    }
}
