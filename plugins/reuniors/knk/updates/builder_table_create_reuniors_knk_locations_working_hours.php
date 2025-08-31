<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkLocationsWorkingHours extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_locations_working_hours', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('location_id')->unsigned();
            $table->integer('working_hours_id')->unsigned();
            $table->primary(['location_id','working_hours_id']);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_knk_locations_working_hours');
    }
}
