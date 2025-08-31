<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicPlaces extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_places', function($table)
    {
        $table->text('description')->nullable()->change();
        $table->text('metadata')->nullable()->change();
    });
}

public function down()
{
    Schema::table('reuniors_evodic_places', function($table)
    {
        $table->text('description')->nullable(false)->change();
        $table->text('metadata')->nullable(false)->change();
    });
}
}
