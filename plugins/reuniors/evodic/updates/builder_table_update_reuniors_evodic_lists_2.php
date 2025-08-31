<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicLists2 extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_lists', function($table)
    {
        $table->string('input_type')->nullable();
        $table->smallInteger('tag_group_id')->nullable()->unsigned();
    });
}

public function down()
{
    Schema::table('reuniors_evodic_lists', function($table)
    {
        $table->dropColumn('input_type');
        $table->dropColumn('tag_group_id');
    });
}
}
