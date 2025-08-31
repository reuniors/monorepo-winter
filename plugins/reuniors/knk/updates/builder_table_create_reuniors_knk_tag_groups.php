<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkTagGroups extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_tag_groups', function($table)
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
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_tag_groups');
    }
}
