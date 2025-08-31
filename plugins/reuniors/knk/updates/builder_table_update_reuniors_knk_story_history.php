<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkStoryHistory extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_story_history', function($table)
        {
            $table->integer('attachment_id')->nullable()->unsigned();
            $table->string('action_type')->nullable();
            $table->string('type')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_knk_story_history', function($table)
        {
            $table->dropColumn('attachment_id');
            $table->dropColumn('action_type');
            $table->dropColumn('type');
        });
    }
}
