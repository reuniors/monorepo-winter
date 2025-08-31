<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkTags extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_tags', function($table)
        {
            $table->text('metadata')->nullable();
            $table->integer('tag_group_id')->nullable()->unsigned();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_tags', function($table)
        {
            $table->dropColumn('metadata');
            $table->dropColumn('tag_group_id');
        });
    }
}
