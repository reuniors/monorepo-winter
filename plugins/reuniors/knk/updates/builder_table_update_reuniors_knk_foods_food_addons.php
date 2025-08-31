<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodsFoodAddons extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_foods_food_addons', function($table)
        {
            $table->double('overridden_price', 10, 0)->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_foods_food_addons', function($table)
        {
            $table->dropColumn('overridden_price');
        });
    }
}
