<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviPersonReports extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_person_reports', function($table)
        {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary();
            $table->integer('person_id')->unsigned();
            $table->integer('reported_by')->unsigned();
            $table->enum('report_type', ['inappropriate', 'false_info', 'duplicate', 'spam', 'harassment', 'privacy_violation', 'other']);
            $table->text('reason');
            $table->text('description')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->integer('resolved_by')->unsigned()->nullable();
            $table->datetime('resolved_at')->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            // Foreign keys
            $table->foreign('person_id', 'fk_rb_person_reports_person_id')
                ->references('id')
                ->on('reuniors_botovi_people')
                ->onDelete('cascade');

            $table->foreign('reported_by', 'fk_rb_person_reports_reported_by')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('resolved_by', 'fk_rb_person_reports_resolved_by')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            // Indexes
            $table->index('person_id', 'idx_person_id');
            $table->index('reported_by', 'idx_reported_by');
            $table->index('report_type', 'idx_report_type');
            $table->index('status', 'idx_status');
            $table->index('created_at', 'idx_created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_person_reports');
    }
}
