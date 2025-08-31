<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkTagsOtherTagGroups extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_tags_other_tag_groups', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('tag_id')->unsigned();
            $table->integer('tag_group_id')->unsigned();
            $table->primary(['tag_id','tag_group_id']);
            $table->foreign(
                    'tag_id',
                    'knk_tags_tags_group_tag_id'
                )
                ->references('id')
                ->on('reuniors_knk_tags')
                ->onDelete('cascade');
            $table->foreign(
                    'tag_group_id',
                    'knk_tags_tags_group_tag_group_id'
                )
                ->references('id')
                ->on('reuniors_knk_tag_groups')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_tags_other_tag_groups');
    }
}
