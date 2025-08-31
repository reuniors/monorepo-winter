<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicTagGroups extends Migration
{
    public function up()
{
    Schema::create('reuniors_evodic_tag_groups', function($table)
    {
        $table->engine = 'InnoDB';
			$table->increments('id');
			$table->timestamps();
			$table->softDeletes();
			$table->string('name', 255);
			$table->string('title', 255);
			$table->text('description', 65535)->nullable();
			$table->bigInteger('sort_order')->default(0);
			$table->string('slug', 255);
			$table->text('metadata', 65535)->nullable();
			$table->integer('parent_id')->unsigned()->nullable();
			$table->text('metadata_t', 65535)->nullable();
			$table->smallInteger('show_on_search')->default(1);
			$table->smallInteger('show_in_filters')->unsigned()->default(0);
			$table->smallInteger('combine_type')->unsigned()->default(0);
			$table->string('type', 255)->default('standard');
			$table->smallInteger('active')->unsigned()->default(0);
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_evodic_tag_groups');
}
}
