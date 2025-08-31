<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodAddons2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_addons', function($table)
        {
            $table->integer('food_addon_group_id')->unsigned();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_addons', function($table)
        {
            $table->dropColumn('food_addon_group_id');
        });
    }
}
