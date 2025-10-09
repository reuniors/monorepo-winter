<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviTagsTagGroups extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_tags_tag_groups', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('tag_id')->unsigned();
            $table->integer('tag_group_id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            // Foreign keys
            $table->foreign('tag_id', 'fk_rb_tags_tag_groups_tag_id')
                ->references('id')
                ->on('reuniors_base_tags')
                ->onDelete('cascade');

            $table->foreign('tag_group_id', 'fk_rb_tags_tag_groups_tag_group_id')
                ->references('id')
                ->on('reuniors_botovi_tag_groups')
                ->onDelete('cascade');

            // Indexes
            $table->index('tag_id', 'idx_tag_id');
            $table->index('tag_group_id', 'idx_tag_group_id');

            // Unique constraint
            $table->unique(['tag_id', 'tag_group_id'], 'unique_tag_tag_group');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_tags_tag_groups');
    }
}
