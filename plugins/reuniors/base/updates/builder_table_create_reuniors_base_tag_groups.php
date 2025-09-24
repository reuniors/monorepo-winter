<?php namespace Reuniors\Base\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateReuniorsBaseTagGroups extends Migration
{
    public function up()
    {
        Schema::create('reuniors_base_tag_groups', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('name', 191);
            $table->string('title', 191);
            $table->text('description')->nullable();
            $table->bigInteger('sort_order')->default(0);
            $table->string('slug', 191);
            $table->text('metadata')->nullable();
            $table->text('metadata_t')->nullable();
            $table->integer('parent_id')->nullable()->unsigned();
            $table->smallInteger('show_on_search')->unsigned()->default(0);
            $table->smallInteger('show_in_filters')->unsigned()->default(0);
            $table->smallInteger('combine_type')->unsigned()->default(0);
            $table->string('type', 191)->default('standard');
            $table->smallInteger('active')->unsigned()->default(0);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_base_tag_groups');
    }
}
