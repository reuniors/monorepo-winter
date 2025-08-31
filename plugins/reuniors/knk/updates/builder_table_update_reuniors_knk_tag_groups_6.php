<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkTagGroups6 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_tag_groups', function($table)
        {
            $table->smallInteger('combine_type')->nullable(false)->unsigned(true)->default(0);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_tag_groups', function($table)
        {
            $table->dropColumn('combine_type');
        });
    }
}
