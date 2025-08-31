<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodAddonGroups3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_addon_groups', function($table)
        {
            $table->integer('max_addons')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_addon_groups', function($table)
        {
            $table->dropColumn('max_addons');
        });
    }
}
