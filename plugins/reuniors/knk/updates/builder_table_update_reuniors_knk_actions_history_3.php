<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkActionsHistory3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_actions_history', function($table)
        {
            $table->text('old_data')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_actions_history', function($table)
        {
            $table->dropColumn('old_data');
        });
    }
}
