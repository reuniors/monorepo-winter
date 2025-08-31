<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkCategories2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_categories', function($table)
        {
            $table->smallInteger('active')->unsigned()->default(0);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_categories', function($table)
        {
            $table->dropColumn('active');
        });
    }
}
