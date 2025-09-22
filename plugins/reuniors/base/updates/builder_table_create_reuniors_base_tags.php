<?php namespace Reuniors\Base\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateReuniorsBaseTags extends Migration
{
    public function up()
    {
        Schema::create('reuniors_base_tags', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('name', 191);
            $table->string('slug', 191);
            $table->text('description')->nullable();
            $table->text('metadata')->nullable();
            $table->text('metadata_t')->nullable();
            $table->integer('tag_group_id')->nullable()->unsigned();
            $table->integer('sort_order')->default(0);
            $table->string('title', 191);
            $table->smallInteger('show_on_search')->unsigned()->default(0);
            $table->smallInteger('show_in_filters')->unsigned()->default(1);
            $table->bigInteger('priority')->default(1000);
            $table->smallInteger('active')->unsigned()->default(0);
            $table->integer('number_of_words')->nullable()->unsigned();
            $table->smallInteger('is_food_tag')->unsigned()->default(1);
            $table->string('icon')->nullable();
            $table->double('value', 10, 0)->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_base_tags');
    }
}
