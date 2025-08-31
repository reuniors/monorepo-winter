<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkTags7 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_tags', function($table)
        {
            $table->smallInteger('show_in_filters')->unsigned()->default(1);
            $table->smallInteger('show_on_search')->default(1)->change();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_tags', function($table)
        {
            $table->dropColumn('show_in_filters');
            $table->smallInteger('show_on_search')->default(0)->change();
        });
    }
}
