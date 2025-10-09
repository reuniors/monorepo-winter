<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviNotifications extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_notifications', function($table)
        {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary();
            $table->integer('person_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->string('type', 50);
            $table->string('title', 255);
            $table->text('message');
            $table->boolean('is_read')->default(false);
            $table->datetime('read_at')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            // Foreign keys
            $table->foreign('person_id', 'fk_rb_notifications_person_id')
                ->references('id')
                ->on('reuniors_botovi_people')
                ->onDelete('cascade');

            $table->foreign('user_id', 'fk_rb_notifications_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Indexes
            $table->index('person_id', 'idx_person_id');
            $table->index('user_id', 'idx_user_id');
            $table->index('type', 'idx_type');
            $table->index('is_read', 'idx_is_read');
            $table->index('created_at', 'idx_created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_notifications');
    }
}
