<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodMenu5 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_menu', function($table)
        {
            $table->text('metadata')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_menu', function($table)
        {
            $table->dropColumn('metadata');
        });
    }
}
