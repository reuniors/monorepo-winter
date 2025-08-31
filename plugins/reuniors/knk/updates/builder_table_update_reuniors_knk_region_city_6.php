<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkRegionCity6 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_region_city', function($table)
        {
            $table->text('metadata')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_region_city', function($table)
        {
            $table->dropColumn('metadata');
        });
    }
}
