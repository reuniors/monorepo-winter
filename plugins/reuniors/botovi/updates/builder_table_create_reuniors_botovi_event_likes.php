<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviEventLikes extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_event_likes', function($table)
        {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary();
            $table->uuid('event_id');
            $table->integer('user_id')->unsigned();
            $table->timestamp('created_at')->nullable();

            // Foreign keys
            $table->foreign('event_id', 'fk_rb_event_likes_event_id')
                ->references('id')
                ->on('reuniors_botovi_events')
                ->onDelete('cascade');

            $table->foreign('user_id', 'fk_rb_event_likes_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Indexes
            $table->index('event_id', 'idx_event_id');
            $table->index('user_id', 'idx_user_id');
            $table->index('created_at', 'idx_created_at');

            // Unique constraint
            $table->unique(['event_id', 'user_id'], 'unique_event_user_like');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_event_likes');
    }
}
