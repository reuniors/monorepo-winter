<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkActionsHistory2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_actions_history', function($table)
        {
            $table->integer('location_id')->nullable()->unsigned();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_actions_history', function($table)
        {
            $table->dropColumn('location_id');
        });
    }
}
