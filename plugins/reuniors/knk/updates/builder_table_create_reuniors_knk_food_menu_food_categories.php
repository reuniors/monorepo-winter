<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkFoodMenuFoodCategories extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_food_menu_food_categories', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('food_menu_id')->unsigned();
            $table->integer('food_category_id')->unsigned();
            $table->primary(['food_menu_id','food_category_id'], 'knk_food_m_categories');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_food_menu_food_categories');
    }
}
