<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkTagGroups2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_tag_groups', function($table)
        {
            $table->integer('parent_id')->nullable()->unsigned();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_tag_groups', function($table)
        {
            $table->dropColumn('parent_id');
        });
    }
}
