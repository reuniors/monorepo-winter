<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviCategories extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_categories', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('name', 255);
            $table->string('slug', 255)->unique();
            $table->text('description')->nullable();
            $table->integer('parent_id')->unsigned()->nullable();
            $table->integer('nest_left')->nullable();
            $table->integer('nest_right')->nullable();
            $table->integer('nest_depth')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();

            // Foreign key for parent
            $table->foreign('parent_id', 'fk_rb_categories_parent_id')
                ->references('id')
                ->on('reuniors_botovi_categories')
                ->onDelete('cascade');

            // Indexes
            $table->index('parent_id', 'idx_parent_id');
            $table->index('nest_left', 'idx_nest_left');
            $table->index('nest_right', 'idx_nest_right');
            $table->index('active', 'idx_active');
            $table->index('sort_order', 'idx_sort_order');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_categories');
    }
}
