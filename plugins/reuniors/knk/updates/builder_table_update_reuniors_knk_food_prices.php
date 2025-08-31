<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodPrices extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_prices', function($table)
        {
            $table->float('price_discount', 10, 0)->nullable();
            $table->float('price', 10, 0)->nullable(false)->unsigned(false)->change();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_prices', function($table)
        {
            $table->dropColumn('price_discount');
            $table->integer('price')->nullable(false)->unsigned(false)->change();
        });
    }
}
