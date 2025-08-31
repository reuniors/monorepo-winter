<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicLists extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_lists', function($table)
    {
        $table->string('title');
    });
}

public function down()
{
    Schema::table('reuniors_evodic_lists', function($table)
    {
        $table->dropColumn('title');
    });
}
}
