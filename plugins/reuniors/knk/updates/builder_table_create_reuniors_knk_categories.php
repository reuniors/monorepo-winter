<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkCategories extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_categories', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('name', 191);
            $table->text('title')->nullable();
            $table->text('text')->nullable();
            $table->text('description')->nullable();
            $table->string('slug', 191);
            $table->integer('parent_id')->nullable();
            $table->integer('nest_left')->nullable();
            $table->integer('nest_right')->nullable();
            $table->integer('nest_depth')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_categories');
    }
}
