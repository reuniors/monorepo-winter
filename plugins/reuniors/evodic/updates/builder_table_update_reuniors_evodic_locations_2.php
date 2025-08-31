<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicLocations2 extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_locations', function($table)
    {
        $table->text('metadata')->nullable();
        $table->smallInteger('active')->unsigned()->default(0);
        $table->dateTime('active_at')->nullable();
        $table->dateTime('deactive_at')->nullable();
    });
}

public function down()
{
    Schema::table('reuniors_evodic_locations', function($table)
    {
        $table->dropColumn('metadata');
        $table->dropColumn('active');
        $table->dropColumn('active_at');
        $table->dropColumn('deactive_at');
    });
}
}
