<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodCategories9 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_categories', function($table)
        {
            $table->integer('active')->unsigned()->default(0);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_categories', function($table)
        {
            $table->dropColumn('active');
        });
    }
}
