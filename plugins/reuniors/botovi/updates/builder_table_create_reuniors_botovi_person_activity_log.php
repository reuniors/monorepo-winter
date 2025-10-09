<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviPersonActivityLog extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_person_activity_log', function($table)
        {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary();
            $table->integer('person_id')->unsigned();
            $table->integer('user_id')->unsigned()->nullable();
            $table->string('action', 100);
            $table->text('description')->nullable();
            $table->text('metadata')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('created_at')->nullable();

            // Foreign keys
            $table->foreign('person_id', 'fk_rb_person_activity_log_person_id')
                ->references('id')
                ->on('reuniors_botovi_people')
                ->onDelete('cascade');

            $table->foreign('user_id', 'fk_rb_person_activity_log_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            // Indexes
            $table->index('person_id', 'idx_person_id');
            $table->index('user_id', 'idx_user_id');
            $table->index('action', 'idx_action');
            $table->index('created_at', 'idx_created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_person_activity_log');
    }
}
