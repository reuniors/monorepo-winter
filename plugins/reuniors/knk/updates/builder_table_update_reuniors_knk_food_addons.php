<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodAddons extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_addons', function($table)
        {
            $table->string('title', 191);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_addons', function($table)
        {
            $table->dropColumn('title');
        });
    }
}
