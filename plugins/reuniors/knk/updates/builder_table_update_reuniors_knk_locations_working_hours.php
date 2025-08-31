<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationsWorkingHours extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_locations_working_hours', function($table)
        {
            $table->string('type')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_knk_locations_working_hours', function($table)
        {
            $table->dropColumn('type');
        });
    }
}
