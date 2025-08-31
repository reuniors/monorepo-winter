<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkUserBadgesHistory2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_user_badges_history', function ($table) {
            $table->dropPrimary();
            $table->unsignedBigInteger('id')->change();
            $table->dropColumn('id');
        });

        Schema::table('reuniors_knk_user_badges_history', function ($table) {
            $table->string('id', 36)->primary();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_user_badges_history', function($table)
        {
            $table->dropPrimary(['id']);
            $table->dropColumn('id');
        });

        Schema::table('reuniors_knk_user_badges_history', function($table)
        {
            $table->increments('id')->primary();
        });
    }
}
