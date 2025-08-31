<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkLocationBadgesHistory extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_location_badges_history', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->integer('location_id')->unsigned();
            $table->integer('tag_id')->unsigned();
            $table->bigInteger('count')->default(1);
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_location_badges_history');
    }
}
