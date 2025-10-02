<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddPausesFieldReuniorsEvodicWorkingHours extends Migration
{
    public function up()
    {
        Schema::table('reuniors_evodic_working_hours', function($table)
        {
            $table->text('pauses')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_evodic_working_hours', function($table)
        {
            $table->dropColumn('pauses');
        });
    }
}
