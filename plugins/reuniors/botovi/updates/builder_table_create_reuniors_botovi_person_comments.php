<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviPersonComments extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_person_comments', function($table)
        {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary();
            $table->integer('person_id')->unsigned();
            $table->integer('user_id')->unsigned()->nullable();
            $table->text('content');
            $table->boolean('is_anonymous')->default(false);
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('rejection_reason')->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();

            // Foreign keys
            $table->foreign('person_id', 'fk_rb_person_comments_person_id')
                ->references('id')
                ->on('reuniors_botovi_people')
                ->onDelete('cascade');

            $table->foreign('user_id', 'fk_rb_person_comments_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            // Indexes
            $table->index('person_id', 'idx_person_id');
            $table->index('user_id', 'idx_user_id');
            $table->index('status', 'idx_status');
            $table->index('is_anonymous', 'idx_is_anonymous');
            $table->index('created_at', 'idx_created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_person_comments');
    }
}
