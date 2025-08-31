<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocations8 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->string('delivery_url_path', 191)->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->dropColumn('delivery_url_path');
        });
    }
}
