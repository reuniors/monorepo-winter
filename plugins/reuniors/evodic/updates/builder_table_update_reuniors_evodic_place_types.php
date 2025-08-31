<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicPlaceTypes extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_place_types', function($table)
    {
        $table->string('type');
    });
}

public function down()
{
    Schema::table('reuniors_evodic_place_types', function($table)
    {
        $table->dropColumn('type');
    });
}
}
