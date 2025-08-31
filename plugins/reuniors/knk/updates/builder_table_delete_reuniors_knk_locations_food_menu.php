<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableDeleteReuniorsKnkLocationsFoodMenu extends Migration
{
    public function up()
    {
        Schema::dropIfExists('reuniors_knk_locations_food_menu');
    }

    public function down()
    {
        Schema::create('reuniors_knk_locations_food_menu', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('location_id')->unsigned();
            $table->integer('food_menu_id')->unsigned();
            $table->primary(['location_id','food_menu_id']);
        });
    }
}
