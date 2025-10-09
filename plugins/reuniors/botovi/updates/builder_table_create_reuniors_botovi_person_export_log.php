<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviPersonExportLog extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_person_export_log', function($table)
        {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary();
            $table->integer('person_id')->unsigned()->nullable();
            $table->integer('exported_by')->unsigned();
            $table->string('export_format', 50);
            $table->text('filters')->nullable();
            $table->text('export_data')->nullable();
            $table->enum('status', ['pending', 'processing', 'completed', 'failed'])->default('pending');
            $table->text('error_message')->nullable();
            $table->string('file_path', 500)->nullable();
            $table->integer('file_size')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            // Foreign keys
            $table->foreign('person_id', 'fk_rb_person_export_log_person_id')
                ->references('id')
                ->on('reuniors_botovi_people')
                ->onDelete('set null');

            $table->foreign('exported_by', 'fk_rb_person_export_log_exported_by')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Indexes
            $table->index('person_id', 'idx_person_id');
            $table->index('exported_by', 'idx_exported_by');
            $table->index('export_format', 'idx_export_format');
            $table->index('status', 'idx_status');
            $table->index('created_at', 'idx_created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_person_export_log');
    }
}
