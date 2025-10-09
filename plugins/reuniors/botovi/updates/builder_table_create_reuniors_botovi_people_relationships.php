<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviPeopleRelationships extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_people_relationships', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('person_id')->unsigned();
            $table->integer('related_person_id')->unsigned();
            $table->string('relationship_type', 100);
            $table->text('description')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            // Foreign keys
            $table->foreign('person_id', 'fk_rb_people_relationships_person_id')
                ->references('id')
                ->on('reuniors_botovi_people')
                ->onDelete('cascade');

            $table->foreign('related_person_id', 'fk_rb_people_relationships_related_person_id')
                ->references('id')
                ->on('reuniors_botovi_people')
                ->onDelete('cascade');

            // Indexes
            $table->index('person_id', 'idx_person_id');
            $table->index('related_person_id', 'idx_related_person_id');
            $table->index('relationship_type', 'idx_relationship_type');
            $table->index('created_at', 'idx_created_at');

            // Unique constraint
            $table->unique(['person_id', 'related_person_id', 'relationship_type'], 'unique_person_relationship');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_people_relationships');
    }
}
