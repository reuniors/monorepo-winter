<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodAddonGroups7 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_addon_groups', function($table)
        {
            $table->string('input_type')->nullable();
            $table->integer('min_required')->unsigned()->default(0);
            $table->integer('other_addons')->unsigned()->default(0);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_addon_groups', function($table)
        {
            $table->dropColumn('input_type');
            $table->dropColumn('min_required');
            $table->dropColumn('other_addons');
        });
    }
}
