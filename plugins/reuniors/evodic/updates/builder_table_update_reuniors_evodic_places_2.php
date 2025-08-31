<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicPlaces2 extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_places', function($table)
    {
        $table->renameColumn('active', 'is_active');
    });
}

public function down()
{
    Schema::table('reuniors_evodic_places', function($table)
    {
        $table->renameColumn('is_active', 'active');
    });
}
}
