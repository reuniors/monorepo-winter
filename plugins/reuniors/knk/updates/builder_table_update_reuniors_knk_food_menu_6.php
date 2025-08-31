<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodMenu6 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_menu', function($table)
        {
            $table->text('metadata_t')->nullable();
            $table->text('food_options')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_menu', function($table)
        {
            $table->dropColumn('metadata_t');
            $table->dropColumn('food_options');
        });
    }
}
