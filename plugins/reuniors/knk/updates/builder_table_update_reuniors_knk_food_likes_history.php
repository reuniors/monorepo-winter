<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodLikesHistory extends Migration
{
    public function up()
    {
        Schema::rename('reuniors_knk_food_menu_likes_history', 'reuniors_knk_food_likes_history');

    }

    public function down()
    {
        Schema::rename('reuniors_knk_food_likes_history', 'reuniors_knk_food_menu_likes_history');

    }
}
