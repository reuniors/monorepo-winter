<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicPlaces7 extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_places', function($table)
    {
        $table->integer('city_id')->unsigned();
    });
}

public function down()
{
    Schema::table('reuniors_evodic_places', function($table)
    {
        $table->dropColumn('city_id');
    });
}
}
