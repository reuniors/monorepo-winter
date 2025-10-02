<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddPausesFieldReuniorsKnkWorkingHours extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_working_hours', function($table)
        {
            $table->text('pauses')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_knk_working_hours', function($table)
        {
            $table->dropColumn('pauses');
        });
    }
}
