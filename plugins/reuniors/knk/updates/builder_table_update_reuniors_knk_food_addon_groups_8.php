<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodAddonGroups8 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_addon_groups', function($table)
        {
            $table->string('combine_type', 191)->nullable(false)->unsigned(false)->default('combined')->change();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_addon_groups', function($table)
        {
            $table->integer('combine_type')->nullable(false)->unsigned()->default(0)->change();
        });
    }
}
