<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkUserBadgesHistory extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_user_badges_history', function($table)
        {
            $table->integer('location_badge_history_id')->unsigned();
            $table->dropColumn('location_id');
            $table->dropColumn('tag_id');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_user_badges_history', function($table)
        {
            $table->dropColumn('location_badge_history_id');
            $table->integer('location_id');
            $table->integer('tag_id');
        });
    }
}
