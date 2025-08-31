<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkStoryHistory extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_story_history', function($table)
        {
            $table->engine = 'InnoDB';
            $table->uuid('id');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->integer('location_id')->nullable()->unsigned();
            $table->integer('user_id')->nullable()->unsigned();
            $table->dateTime('activation_at');
            $table->dateTime('deactivation_at');
            $table->string('title', 100)->nullable();
            $table->string('description', 255)->nullable();
            $table->string('url', 512)->nullable();
            $table->string('url_title', 100)->nullable();
            $table->primary(['id']);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_knk_story_history');
    }
}
