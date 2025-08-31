<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkLocationRelatedLocations extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_location_related_locations', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('location_id');
            $table->integer('location_related_id');
            $table->primary(['location_id','location_related_id'], 'knk_location_related_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_location_related_locations');
    }
}
