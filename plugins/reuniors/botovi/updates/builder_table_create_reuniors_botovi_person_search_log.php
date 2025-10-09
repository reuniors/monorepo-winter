<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviPersonSearchLog extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_person_search_log', function($table)
        {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary();
            $table->integer('user_id')->unsigned()->nullable();
            $table->string('search_term', 255);
            $table->text('filters')->nullable();
            $table->integer('results_count')->default(0);
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('created_at')->nullable();

            // Foreign keys
            $table->foreign('user_id', 'fk_rb_person_search_log_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            // Indexes
            $table->index('user_id', 'idx_user_id');
            $table->index('search_term', 'idx_search_term');
            $table->index('created_at', 'idx_created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_person_search_log');
    }
}
