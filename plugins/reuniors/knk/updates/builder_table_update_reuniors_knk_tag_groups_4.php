<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkTagGroups4 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_tag_groups', function($table)
        {
            $table->smallInteger('show_on_search')->unsigned()->default(0);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_tag_groups', function($table)
        {
            $table->dropColumn('show_on_search');
        });
    }
}
