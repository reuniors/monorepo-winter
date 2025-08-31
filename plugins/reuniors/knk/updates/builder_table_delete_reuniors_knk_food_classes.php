<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableDeleteReuniorsKnkFoodClasses extends Migration
{
    public function up()
    {
        Schema::dropIfExists('reuniors_knk_food_classes');
    }

    public function down()
    {
        Schema::create('reuniors_knk_food_classes', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('name', 191);
            $table->string('identifier', 191)->nullable();
            $table->smallInteger('active')->unsigned()->default(0);
        });
    }
}
