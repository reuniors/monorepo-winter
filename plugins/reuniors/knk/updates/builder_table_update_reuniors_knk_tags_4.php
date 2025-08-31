<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkTags4 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_tags', function($table)
        {
            $table->text('metadata_t')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_tags', function($table)
        {
            $table->dropColumn('metadata_t');
        });
    }
}
