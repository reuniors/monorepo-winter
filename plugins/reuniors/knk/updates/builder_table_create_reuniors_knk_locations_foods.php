<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkLocationsFoods extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_locations_foods', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('location_id')->unsigned();
            $table->integer('food_id')->unsigned();
            $table->primary(['location_id','food_id']);
            $table->foreign(
                    'location_id',
                    'knk_loc_foods_loc_id'
                )
                ->references('id')
                ->on('reuniors_knk_locations')
                ->onDelete('cascade');
            $table->foreign(
                    'food_id',
                    'knk_loc_foods_food_id'
                )
                ->references('id')
                ->on('reuniors_knk_foods')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_locations_foods');
    }
}
