<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkLocations extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_locations', function ($table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id')->unsigned();
            $table->string('name', 1000);
            $table->string('slug', 191);
            $table->integer('user_id')->unsigned();
            $table->text('text')->nullable();
            $table->text('description')->nullable();
            $table->text('title')->nullable();
            $table->dateTime('activation_time')->nullable();
            $table->text('metadata')->nullable();
            $table->smallInteger('active')->default(0);
            $table->bigInteger('sort_order')->unsigned()->default(0);
            $table->text('snippet');
            $table->smallInteger('comments_available')->unsigned()->default(1);
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_locations');
    }
}
