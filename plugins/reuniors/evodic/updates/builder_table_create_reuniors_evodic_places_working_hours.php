<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicPlacesWorkingHours extends Migration
{
    public function up()
    {
        Schema::create('reuniors_evodic_places_working_hours', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('working_hours_id')->unsigned();
            $table->integer('place_id')->unsigned();
            $table->string('type')->nullable();
            $table->primary(['working_hours_id','place_id']);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_evodic_places_working_hours');
    }
}
