<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodCategories2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_categories', function($table)
        {
            $table->text('metadata');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_categories', function($table)
        {
            $table->dropColumn('metadata');
        });
    }
}
