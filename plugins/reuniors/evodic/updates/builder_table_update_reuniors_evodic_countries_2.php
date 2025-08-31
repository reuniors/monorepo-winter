<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicCountries2 extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_countries', function($table)
    {
        $table->text('metadata')->nullable();
        $table->smallInteger('active')->unsigned()->default(0);
    });
}

public function down()
{
    Schema::table('reuniors_evodic_countries', function($table)
    {
        $table->dropColumn('metadata');
        $table->dropColumn('active');
    });
}
}
