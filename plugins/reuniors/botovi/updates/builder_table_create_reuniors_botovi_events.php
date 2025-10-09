<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviEvents extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_events', function($table)
        {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary();
            $table->integer('person_id')->unsigned();
            $table->integer('created_by')->unsigned();
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->datetime('event_date');
            $table->enum('event_type', ['meeting', 'interview', 'public_appearance', 'social_event', 'work_event', 'other']);
            $table->string('location', 255)->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->integer('likes_count')->default(0);
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();

            // Foreign keys
            $table->foreign('person_id', 'fk_rb_events_person_id')
                ->references('id')
                ->on('reuniors_botovi_people')
                ->onDelete('cascade');

            $table->foreign('created_by', 'fk_rb_events_created_by')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Indexes
            $table->index('person_id', 'idx_person_id');
            $table->index('created_by', 'idx_created_by');
            $table->index('event_date', 'idx_event_date');
            $table->index('event_type', 'idx_event_type');
            $table->index('status', 'idx_status');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_events');
    }
}
