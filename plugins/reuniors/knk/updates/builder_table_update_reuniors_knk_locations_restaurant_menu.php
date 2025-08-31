<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationsRestaurantMenu extends Migration
{
    public function up()
    {
        Schema::rename('reuniors_knk_locations_food_categories', 'reuniors_knk_locations_restaurant_menu');
        Schema::table('reuniors_knk_locations_restaurant_menu', function($table)
        {
            $table->dropPrimary(['location_id','food_category_id']);
            $table->renameColumn('food_category_id', 'restaurant_menu_id');
            $table->primary(['location_id','restaurant_menu_id'], 'knk_location_restmenu');
        });
    }

    public function down()
    {
        Schema::rename('reuniors_knk_locations_restaurant_menu', 'reuniors_knk_locations_food_categories');
        Schema::table('reuniors_knk_locations_food_categories', function($table)
        {
            $table->dropPrimary(['location_id','restaurant_menu_id']);
            $table->renameColumn('restaurant_menu_id', 'food_category_id');
            $table->primary(['location_id','food_category_id']);
        });
    }
}
