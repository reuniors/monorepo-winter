<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkFoodClassTypes extends Migration
{
    public function up()
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
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_food_class_types');
    }
}
