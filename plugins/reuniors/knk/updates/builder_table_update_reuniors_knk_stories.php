<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkStories extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_stories', function($table)
        {
            $table->string('status');
            $table->index(['status']);
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_knk_stories', function($table)
        {
            $table->dropColumn('status');
        });
    }
}
