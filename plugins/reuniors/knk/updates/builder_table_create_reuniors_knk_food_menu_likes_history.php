<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkFoodMenuLikesHistory extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_food_menu_likes_history', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->integer('food_menu_id')->unsigned();
            $table->string('ip_address', 191);
            $table->text('user_agent');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_food_menu_likes_history');
    }
}
