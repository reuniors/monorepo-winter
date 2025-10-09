<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviPeopleGroups extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_people_groups', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('person_id')->unsigned();
            $table->integer('group_id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            // Foreign keys
            $table->foreign('person_id', 'fk_rb_people_groups_person_id')
                ->references('id')
                ->on('reuniors_botovi_people')
                ->onDelete('cascade');

            $table->foreign('group_id', 'fk_rb_people_groups_group_id')
                ->references('id')
                ->on('reuniors_botovi_groups')
                ->onDelete('cascade');

            // Indexes
            $table->index('person_id', 'idx_person_id');
            $table->index('group_id', 'idx_group_id');

            // Unique constraint
            $table->unique(['person_id', 'group_id'], 'unique_person_group');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_people_groups');
    }
}
