<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkFoodCategories extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_food_categories', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('name', 191);
            $table->string('title', 191);
            $table->string('slug', 191);
            $table->text('description')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_food_categories');
    }
}
