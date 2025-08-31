<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkTags10 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_tags', function($table)
        {
            $table->smallInteger('active')->unsigned()->default(0);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_tags', function($table)
        {
            $table->dropColumn('active');
        });
    }
}
