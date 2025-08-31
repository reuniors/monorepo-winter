<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkWorkingHours extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_working_hours', function($table)
        {
            $table->time('time_to')->nullable(false)->unsigned(false)->default(null)->change();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_knk_working_hours', function($table)
        {
            $table->date('time_to')->nullable(false)->unsigned(false)->default(null)->change();
        });
    }
}
