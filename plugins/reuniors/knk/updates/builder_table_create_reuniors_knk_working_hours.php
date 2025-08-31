<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkWorkingHours extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_working_hours', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->time('time_from');
            $table->date('time_to');
            $table->string('name');
            $table->string('days_codes');
            $table->smallInteger('active')->default(1);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_knk_working_hours');
    }
}
