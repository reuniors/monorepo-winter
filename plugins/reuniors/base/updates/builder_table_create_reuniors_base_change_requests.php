<?php namespace Reuniors\Base\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateReuniorsBaseChangeRequests extends Migration
{
    public function up()
    {
        Schema::create('reuniors_base_change_requests', function($table)
        {
            $table->increments('id');
            $table->string('entity_type');
            $table->unsignedInteger('entity_id');
            $table->string('field_name');
            $table->text('old_value')->nullable();
            $table->text('new_value')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->unsignedInteger('created_by')->nullable();
            $table->unsignedInteger('approved_by')->nullable();
            $table->unsignedInteger('rejected_by')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->timestamps();

            $table->index(['entity_type', 'entity_id']);
            $table->index('status');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_base_change_requests');
    }
}
