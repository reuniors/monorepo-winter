<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodLikesHistory3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_likes_history', function($table)
        {
            $table->integer('user_id')->unsigned();
            $table->string('ip_address', 191)->nullable()->change();
            $table->text('user_agent')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_likes_history', function($table)
        {
            $table->dropColumn('user_id');
            $table->string('ip_address', 191)->nullable(false)->change();
            $table->text('user_agent')->nullable(false)->change();
        });
    }
}
