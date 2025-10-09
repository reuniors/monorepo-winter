<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviPeopleCategories extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_people_categories', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('person_id')->unsigned();
            $table->integer('category_id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            // Foreign keys
            $table->foreign('person_id', 'fk_rb_people_categories_person_id')
                ->references('id')
                ->on('reuniors_botovi_people')
                ->onDelete('cascade');

            $table->foreign('category_id', 'fk_rb_people_categories_category_id')
                ->references('id')
                ->on('reuniors_botovi_categories')
                ->onDelete('cascade');

            // Indexes
            $table->index('person_id', 'idx_person_id');
            $table->index('category_id', 'idx_category_id');

            // Unique constraint
            $table->unique(['person_id', 'category_id'], 'unique_person_category');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_people_categories');
    }
}
