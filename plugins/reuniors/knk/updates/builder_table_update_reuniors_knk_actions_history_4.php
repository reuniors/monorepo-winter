<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkActionsHistory4 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_actions_history', function($table)
        {
            $table->string('entity_type');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_actions_history', function($table)
        {
            $table->dropColumn('entity_type');
        });
    }
}
