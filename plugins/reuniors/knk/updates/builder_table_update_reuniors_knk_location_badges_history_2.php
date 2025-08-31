<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationBadgesHistory2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_location_badges_history', function($table)
        {
            $table->integer('tag_group_id')->nullable()->unsigned();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_knk_location_badges_history', function($table)
        {
            $table->dropColumn('tag_group_id');
        });
    }
}
