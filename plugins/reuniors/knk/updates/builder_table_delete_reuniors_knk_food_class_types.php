<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableDeleteReuniorsKnkFoodClassTypes extends Migration
{
    public function up()
    {
        Schema::dropIfExists('reuniors_knk_food_class_types');
    }

    public function down()
    {
        Schema::create('reuniors_knk_food_class_types', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('name', 191);
            $table->string('type', 191)->nullable();
            $table->integer('food_class_id');
            $table->bigInteger('sort_order')->unsigned()->default(0);
            $table->smallInteger('active')->unsigned()->default(1);
            $table->string('title', 191);
            $table->string('identifier', 191)->nullable();
        });
    }
}
