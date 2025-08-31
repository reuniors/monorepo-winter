<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkFoodsFoodAddons2 extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_foods_food_addons', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('food_id')->unsigned();
            $table->integer('food_addon_group_id')->unsigned();
            $table->integer('food_addon_id')->unsigned();
            $table->primary(['food_id','food_addon_group_id','food_addon_id'], 'knk_foods_food_addons_pk');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_foods_food_addons');
    }
}
