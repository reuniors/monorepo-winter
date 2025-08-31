<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodCategories extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_categories', function($table)
        {
            $table->bigInteger('sort_order')->default(0);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_categories', function($table)
        {
            $table->dropColumn('sort_order');
        });
    }
}
