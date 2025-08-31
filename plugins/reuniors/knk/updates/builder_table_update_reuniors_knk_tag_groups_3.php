<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkTagGroups3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_tag_groups', function($table)
        {
            $table->text('metadata_t')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_tag_groups', function($table)
        {
            $table->dropColumn('metadata_t');
        });
    }
}
