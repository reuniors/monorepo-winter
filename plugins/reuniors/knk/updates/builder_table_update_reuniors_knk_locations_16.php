<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocations16 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->integer('rzr_id')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->dropColumn('rzr_id');
        });
    }
}
