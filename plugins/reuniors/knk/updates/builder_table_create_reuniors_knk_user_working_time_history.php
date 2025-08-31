<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkUserWorkingTimeHistory extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_user_working_time_history', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->integer('user_id')->unsigned();
            $table->dateTime('date');
            $table->time('start_time');
            $table->time('end_time');
            $table->integer('duration_in_sec')->unsigned();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_knk_user_working_time_history');
    }
}
