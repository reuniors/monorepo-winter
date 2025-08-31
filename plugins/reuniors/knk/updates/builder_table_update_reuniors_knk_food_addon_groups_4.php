<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodAddonGroups4 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_addon_groups', function($table)
        {
            $table->bigInteger('sort_order')->unsigned()->default(0);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_addon_groups', function($table)
        {
            $table->dropColumn('sort_order');
        });
    }
}
