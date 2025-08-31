<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkUserBadgesHistory extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_user_badges_history', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->integer('user_id')->unsigned();
            $table->integer('location_id');
            $table->integer('tag_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_user_badges_history');
    }
}
