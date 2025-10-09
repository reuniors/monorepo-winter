<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviChangeRequests extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_change_requests', function($table)
        {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary();
            $table->string('entity_type', 50);
            $table->string('entity_id', 100)->nullable();
            $table->string('action_class', 255);
            $table->text('data');
            $table->text('action_data');
            $table->enum('change_type', ['create', 'update', 'delete']);
            $table->date('scheduled_date');
            $table->enum('status', ['pending', 'approved', 'rejected', 'executed', 'failed'])->default('pending');
            $table->unsignedInteger('created_by');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            // Foreign key for created_by
            $table->foreign('created_by', 'fk_rb_change_requests_created_by')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Indexes
            $table->index('entity_id', 'idx_entity_id');
            $table->index('scheduled_date', 'idx_scheduled_date');
            $table->index('status', 'idx_status');
            $table->index('action_class', 'idx_action_class');

            // Unique constraint - only if entity_id exists
            $table->unique(['scheduled_date', 'entity_type', 'entity_id', 'change_type'], 'unique_date_entity')
                  ->where('entity_id IS NOT NULL');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_change_requests');
    }
}
