<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationBadgesHistory extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_location_badges_history', function($table)
        {
            $table->renameColumn('count', 'selected_count');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_location_badges_history', function($table)
        {
            $table->renameColumn('selected_count', 'count');
        });
    }
}
