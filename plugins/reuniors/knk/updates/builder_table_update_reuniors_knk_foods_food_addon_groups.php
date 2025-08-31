<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodsFoodAddonGroups extends Migration
{
    public function up()
    {
        Schema::rename('reuniors_knk_foods_food_addons', 'reuniors_knk_foods_food_addon_groups');
        Schema::table('reuniors_knk_foods_food_addon_groups', function($table)
        {
            $table->dropPrimary(['food_id','food_addon_id']);
            $table->renameColumn('food_addon_id', 'food_addon_group_id');
            $table->primary(['food_id','food_addon_group_id'], 'knk_food_food_addon_group_id');
        });
    }

    public function down()
    {
        Schema::rename('reuniors_knk_foods_food_addon_groups', 'reuniors_knk_foods_food_addons');
        Schema::table('reuniors_knk_foods_food_addons', function($table)
        {
            $table->dropPrimary(['food_id','food_addon_group_id']);
            $table->renameColumn('food_addon_group_id', 'food_addon_id');
            $table->primary(['food_id','food_addon_id']);
        });
    }
}
