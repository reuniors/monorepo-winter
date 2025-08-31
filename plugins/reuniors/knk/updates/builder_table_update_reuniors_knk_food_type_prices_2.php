<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodTypePrices2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_type_prices', function($table)
        {
            $table->bigInteger('sort_order')->unsigned()->default(0);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_type_prices', function($table)
        {
            $table->dropColumn('sort_order');
        });
    }
}
