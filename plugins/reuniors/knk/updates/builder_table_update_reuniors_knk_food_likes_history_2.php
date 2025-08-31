<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodLikesHistory2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_likes_history', function($table)
        {
            $table->renameColumn('food_menu_id', 'food_id');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_likes_history', function($table)
        {
            $table->renameColumn('food_id', 'food_menu_id');
        });
    }
}
