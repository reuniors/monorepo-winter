<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicActions extends Migration
{
    public function up()
    {
        Schema::create('reuniors_evodic_actions', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->integer('created_by')->unsigned();
            $table->integer('updated_by')->nullable()->unsigned();
            
            $table->string('attachment_type');
            $table->integer('attachment_id')->nullable();
            $table->string('action_type');
            $table->longText('data')->nullable();
            $table->string('status');
            $table->string('failure_reason')->nullable();
            $table->integer('location_id')->unsigned()->nullable();
            $table->string('entity_type');
                        
            $table->integer('attach_to_id')->nullable();
            $table->string('attach_to_type')->nullable();
            $table->string('attach_to_relation_name')->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_evodic_actions');
    }
}
