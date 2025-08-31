<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicLocations9 extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_locations', function($table)
    {
        $table->smallInteger('type')->default(0);
    });
}

public function down()
{
    Schema::table('reuniors_evodic_locations', function($table)
    {
        $table->dropColumn('type');
    });
}
}
