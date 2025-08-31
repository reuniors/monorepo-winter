<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkActions6 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_actions', function($table)
        {
            $table->text('old_data')->nullable()->default('{}');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_actions', function($table)
        {
            $table->dropColumn('old_data');
        });
    }
}
