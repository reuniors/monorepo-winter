<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddUtcFieldsReuniorsKnkWorkingHours extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_working_hours', function($table)
        {
            $table->time('time_from_utc')->nullable();
            $table->date('time_to_utc')->nullable(); // Note: time_to is actually DATE type in KNK
            $table->text('pauses_utc')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_knk_working_hours', function($table)
        {
            $table->dropColumn([
                'time_from_utc',
                'time_to_utc',
                'pauses_utc'
            ]);
        });
    }
}
