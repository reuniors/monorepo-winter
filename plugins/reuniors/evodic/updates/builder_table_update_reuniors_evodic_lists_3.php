<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicLists3 extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_lists', function($table)
    {
        $table->bigInteger('sort_order')->unsigned()->default(0);
    });
}

public function down()
{
    Schema::table('reuniors_evodic_lists', function($table)
    {
        $table->dropColumn('sort_order');
    });
}
}
