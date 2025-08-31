<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodMenu2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_menu', function($table)
        {
            $table->smallInteger('online_order')->default(0);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_menu', function($table)
        {
            $table->dropColumn('online_order');
        });
    }
}
