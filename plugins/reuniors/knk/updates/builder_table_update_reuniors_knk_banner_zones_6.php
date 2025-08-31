<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkBannerZones6 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_banner_zones', function($table)
        {
            $table->text('metadata')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_banner_zones', function($table)
        {
            $table->text('metadata')->nullable(false)->change();
        });
    }
}
