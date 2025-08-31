<?php namespace Reuniors\Comments\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsCommentsLikesHistory extends Migration
{
    public function up()
    {
        Schema::create('reuniors_comments_likes_history', function($table)
        {
            $table->engine = 'InnoDB';
            $table->string('id', 36);
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->integer('user_id')->unsigned();
            $table->integer('comments_post_id')->unsigned();
            $table->primary(['id']);

            $table->foreign('user_id', 'comments_lh_users_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');


            $table->foreign('comments_post_id', 'comments_lh_comments_posts_id')
                ->references('id')
                ->on('reuniors_comments_posts')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_comments_likes_history');
    }
}
