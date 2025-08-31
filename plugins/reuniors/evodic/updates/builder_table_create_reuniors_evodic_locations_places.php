<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicLocationsPlaces extends Migration
{
    public function up()
{
    Schema::create('reuniors_evodic_locations_places', function($table)
    {
        $table->engine = 'InnoDB';
        $table->integer('location_id')->unsigned();
        $table->integer('place_id')->unsigned();
        $table->integer('sort_order')->unsigned()->default(0);
        $table->primary(['location_id','place_id']);
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_evodic_locations_places');
}
}
