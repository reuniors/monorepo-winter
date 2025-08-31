<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkLocationsCategories extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_locations_categories', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('location_id');
            $table->integer('category_id');
            $table->primary(['location_id','category_id'], 'knk_location_id_category_id_pk');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_locations_categories');
    }
}
