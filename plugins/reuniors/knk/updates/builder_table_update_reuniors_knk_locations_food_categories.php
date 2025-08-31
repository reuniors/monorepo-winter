<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationsFoodCategories extends Migration
{
    public function up()
    {
        Schema::rename('reuniors_knk_locations_food_menu', 'reuniors_knk_locations_food_categories');
        Schema::table('reuniors_knk_locations_food_categories', function($table)
        {
            $table->dropPrimary(['location_id','food_menu_id']);
            $table->renameColumn('food_menu_id', 'food_category_id');
            $table->primary(['location_id','food_category_id'], 'knk_location_food_cat');
        });
    }

    public function down()
    {
        Schema::rename('reuniors_knk_locations_food_categories', 'reuniors_knk_locations_food_menu');
        Schema::table('reuniors_knk_locations_food_menu', function($table)
        {
            $table->dropPrimary(['location_id','food_category_id']);
            $table->renameColumn('food_category_id', 'food_menu_id');
            $table->primary(['location_id','food_menu_id']);
        });
    }
}
