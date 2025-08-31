<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodTypePrices extends Migration
{
    public function up()
    {
        Schema::rename('reuniors_knk_food_prices', 'reuniors_knk_food_type_prices');
        Schema::table('reuniors_knk_food_type_prices', function($table)
        {
            $table->integer('food_class_type_id')->unsigned();
            $table->dropColumn('option_type_index');
        });
    }

    public function down()
    {
        Schema::rename('reuniors_knk_food_type_prices', 'reuniors_knk_food_prices');
        Schema::table('reuniors_knk_food_prices', function($table)
        {
            $table->dropColumn('food_class_type_id');
            $table->integer('option_type_index');
        });
    }
}
