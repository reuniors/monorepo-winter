<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicCities3 extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_cities', function($table)
    {
        $table->smallInteger('active')->unsigned()->default(0);
    });
}

public function down()
{
    Schema::table('reuniors_evodic_cities', function($table)
    {
        $table->dropColumn('active');
    });
}
}
