<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviPersonFlags extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_person_flags', function($table)
        {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary();
            $table->integer('person_id')->unsigned();
            $table->integer('flagged_by')->unsigned();
            $table->enum('flag_type', [
                'inaccurate_data', 'accurate_data', 'not_bot', 'not_cacija', 'is_bot', 'is_cacija',
                'wrong_category', 'duplicate', 'outdated', 'misleading', 'inappropriate',
                'know_person', 'dont_know_person', 'verified', 'unverified', 'sensitive',
                'controversial', 'political', 'criminal', 'public_figure'
            ]);
            $table->text('reason')->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->integer('resolved_by')->unsigned()->nullable();
            $table->datetime('resolved_at')->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            // Foreign keys
            $table->foreign('person_id', 'fk_rb_person_flags_person_id')
                ->references('id')
                ->on('reuniors_botovi_people')
                ->onDelete('cascade');

            $table->foreign('flagged_by', 'fk_rb_person_flags_flagged_by')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('resolved_by', 'fk_rb_person_flags_resolved_by')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            // Indexes
            $table->index('person_id', 'idx_person_id');
            $table->index('flagged_by', 'idx_flagged_by');
            $table->index('flag_type', 'idx_flag_type');
            $table->index('status', 'idx_status');
            $table->index('created_at', 'idx_created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_person_flags');
    }
}
