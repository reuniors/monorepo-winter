<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicCities2 extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_cities', function($table)
    {
        $table->bigInteger('sort_order')->unsigned()->default(0);
        $table->text('metadata')->nullable();
    });
}

public function down()
{
    Schema::table('reuniors_evodic_cities', function($table)
    {
        $table->dropColumn('sort_order');
        $table->dropColumn('metadata');
    });
}
}
