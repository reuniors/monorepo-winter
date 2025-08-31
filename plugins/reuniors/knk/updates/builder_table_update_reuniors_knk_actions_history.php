<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkActionsHistory extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_actions_history', function($table)
        {
            $table->longText('data')->nullable()->unsigned(false)->default(null)->change();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_actions_history', function($table)
        {
            $table->text('data')->nullable()->unsigned(false)->default(null)->change();
        });
    }
}
