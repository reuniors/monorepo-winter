<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodClassTypes extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_class_types', function($table)
        {
            $table->integer('food_class_id');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_class_types', function($table)
        {
            $table->dropColumn('food_class_id');
        });
    }
}
