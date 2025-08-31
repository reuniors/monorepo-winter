<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicTags extends Migration
{
    public function up()
{
    Schema::create('reuniors_evodic_tags', function($table)
    {
        $table->engine = 'InnoDB';
			$table->increments('id');
			$table->timestamps();
			$table->softDeletes();
			$table->string('name', 255);
			$table->string('slug', 255);
			$table->text('description', 65535)->nullable();
			$table->text('metadata', 65535)->nullable();
			$table->integer('tag_group_id')->unsigned()->nullable();
			$table->integer('sort_order')->default(0);
			$table->string('title', 255);
			$table->text('metadata_t', 65535)->nullable();
			$table->smallInteger('show_on_search')->default(1);
			$table->bigInteger('priority')->default(1000);
			$table->smallInteger('show_in_filters')->unsigned()->default(1);
			$table->smallInteger('active')->unsigned()->default(0);
			$table->integer('number_of_words')->unsigned()->nullable();
			$table->smallInteger('is_food_tag')->unsigned()->default(1);
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_evodic_tags');
}
}
