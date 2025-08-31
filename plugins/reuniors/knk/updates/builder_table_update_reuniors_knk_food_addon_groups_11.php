<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodAddonGroups11 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_addon_groups', function($table)
        {
            $table->dropColumn('active');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_addon_groups', function($table)
        {
            $table->smallInteger('active')->default(1);
        });
    }
}
