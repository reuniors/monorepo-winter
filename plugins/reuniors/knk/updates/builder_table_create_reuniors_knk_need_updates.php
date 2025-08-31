<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkNeedUpdates extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_need_updates', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('attachment_id')->unsigned();
            $table->string('action_type');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->primary(['attachment_id','action_type']);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_knk_need_updates');
    }
}
