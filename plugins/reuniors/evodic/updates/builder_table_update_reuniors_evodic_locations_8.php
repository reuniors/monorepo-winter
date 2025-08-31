<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicLocations8 extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_locations', function($table)
    {
        $table->string('wifi_password', 50)->nullable();
    });
}

public function down()
{
    Schema::table('reuniors_evodic_locations', function($table)
    {
        $table->dropColumn('wifi_password');
    });
}
}
