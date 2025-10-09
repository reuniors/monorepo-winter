<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviPeopleTags extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_people_tags', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('person_id')->unsigned();
            $table->integer('tag_id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            // Foreign keys
            $table->foreign('person_id', 'fk_rb_people_tags_person_id')
                ->references('id')
                ->on('reuniors_botovi_people')
                ->onDelete('cascade');

            $table->foreign('tag_id', 'fk_rb_people_tags_tag_id')
                ->references('id')
                ->on('reuniors_base_tags')
                ->onDelete('cascade');

            // Indexes
            $table->index('person_id', 'idx_person_id');
            $table->index('tag_id', 'idx_tag_id');

            // Unique constraint
            $table->unique(['person_id', 'tag_id'], 'unique_person_tag');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_people_tags');
    }
}
