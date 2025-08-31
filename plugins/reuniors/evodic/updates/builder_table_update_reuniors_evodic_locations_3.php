<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicLocations3 extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_locations', function($table)
    {
        $table->integer('main_owner_id')->nullable()->unsigned();
    });
}

public function down()
{
    Schema::table('reuniors_evodic_locations', function($table)
    {
        $table->dropColumn('main_owner_id');
    });
}
}
