<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicLocations extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_locations', function($table)
    {
        $table->string('title', 255);
    });
}

public function down()
{
    Schema::table('reuniors_evodic_locations', function($table)
    {
        $table->dropColumn('title');
    });
}
}
