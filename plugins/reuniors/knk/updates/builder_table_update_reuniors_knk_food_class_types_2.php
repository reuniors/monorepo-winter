<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodClassTypes2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_class_types', function($table)
        {
            $table->bigInteger('sort_order')->unsigned()->default(0);
            $table->smallInteger('active')->unsigned()->default(1);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_class_types', function($table)
        {
            $table->dropColumn('sort_order');
            $table->dropColumn('active');
        });
    }
}
