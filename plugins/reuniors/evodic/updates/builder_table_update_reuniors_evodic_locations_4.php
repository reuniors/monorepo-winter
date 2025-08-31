<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicLocations4 extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_locations', function($table)
    {
        $table->renameColumn('deactive_at', 'deactivate_at');
    });
}

public function down()
{
    Schema::table('reuniors_evodic_locations', function($table)
    {
        $table->renameColumn('deactivate_at', 'deactive_at');
    });
}
}
