<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicListData extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_list_data', function($table)
    {
        $table->bigInteger('sort_order')->unsigned()->default(0);
    });
}

public function down()
{
    Schema::table('reuniors_evodic_list_data', function($table)
    {
        $table->dropColumn('sort_order');
    });
}
}
