<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicLists4 extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_lists', function($table)
    {
        $table->string('relation_model')->nullable();
        $table->string('identifier');
    });
}

public function down()
{
    Schema::table('reuniors_evodic_lists', function($table)
    {
        $table->dropColumn('relation_model');
        $table->dropColumn('identifier');
    });
}
}
