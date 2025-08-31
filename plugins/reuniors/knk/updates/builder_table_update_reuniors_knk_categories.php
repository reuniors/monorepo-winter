<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkCategories extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_categories', function($table)
        {
            $table->bigInteger('priority')->default(1000);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_categories', function($table)
        {
            $table->dropColumn('priority');
        });
    }
}
