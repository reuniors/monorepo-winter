<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodAddons6 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_addons', function($table)
        {
            $table->text('metadata')->nullable();
            $table->text('addons_dependencies')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_addons', function($table)
        {
            $table->dropColumn('metadata');
            $table->dropColumn('addons_dependencies');
        });
    }
}
