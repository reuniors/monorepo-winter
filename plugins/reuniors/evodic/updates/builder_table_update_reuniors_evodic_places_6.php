<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicPlaces6 extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_places', function($table)
    {
        $table->integer('place_type_id')->unsigned();
    });
}

public function down()
{
    Schema::table('reuniors_evodic_places', function($table)
    {
        $table->dropColumn('place_type_id');
    });
}
}
