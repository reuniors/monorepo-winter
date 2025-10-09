<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviPersonReviews extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_person_reviews', function($table)
        {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary();
            $table->integer('person_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->integer('rating')->unsigned(); // 1-10 star rating
            $table->text('comment')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();

            // Foreign keys
            $table->foreign('person_id', 'fk_rb_person_reviews_person_id')
                ->references('id')
                ->on('reuniors_botovi_people')
                ->onDelete('cascade');

            $table->foreign('user_id', 'fk_rb_person_reviews_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Indexes
            $table->index('person_id', 'idx_person_id');
            $table->index('user_id', 'idx_user_id');
            $table->index('rating', 'idx_rating');
            $table->index('status', 'idx_status');
            $table->index('created_at', 'idx_created_at');

            // Unique constraint - one review per user per person
            $table->unique(['person_id', 'user_id'], 'unique_person_user_review');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_person_reviews');
    }
}
