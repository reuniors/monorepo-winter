<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkRestaurantMenuFoodCategories extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_restaurant_menu_food_categories', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('restaurant_menu_id')->unsigned();
            $table->integer('food_category_id')->unsigned();
            $table->primary(['restaurant_menu_id','food_category_id'], 'knk_rest_menu_food_cat');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_restaurant_menu_food_categories');
    }
}
