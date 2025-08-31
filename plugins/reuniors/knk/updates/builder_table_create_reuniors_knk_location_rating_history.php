<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkLocationRatingHistory extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_location_rating_history', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->integer('location_rating_id')->unsigned();
            $table->integer('location_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->string('ip_address', 191)->nullable();
            $table->string('user_agent', 10000)->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_location_rating_history');
    }
}
