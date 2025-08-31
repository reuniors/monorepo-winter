<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodLikesHistory4 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_likes_history', function($table)
        {
            $table->dropColumn('deleted_at');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_likes_history', function($table)
        {
            $table->timestamp('deleted_at')->nullable();
        });
    }
}
