<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkBanners2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_banners', function($table)
        {
            $table->smallInteger('active')->default(1);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_banners', function($table)
        {
            $table->dropColumn('active');
        });
    }
}
