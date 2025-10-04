<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableMakeOriginalFieldsNullableReuniorsEvodic extends Migration
{
    public function up()
    {
        // Make original fields nullable in working_hours table
        Schema::table('reuniors_evodic_working_hours', function($table)
        {
            $table->time('time_from')->nullable()->change();
            $table->time('time_to')->nullable()->change();
        });
    }
    
    public function down()
    {
        // Revert working_hours table
        Schema::table('reuniors_evodic_working_hours', function($table)
        {
            $table->time('time_from')->nullable(false)->change();
            $table->time('time_to')->nullable(false)->change();
        });
    }
}
