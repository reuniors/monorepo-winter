<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodCategories6 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_categories', function($table)
        {
            $table->integer('food_class_id')->nullable()->unsigned();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_categories', function($table)
        {
            $table->dropColumn('food_class_id');
        });
    }
}
