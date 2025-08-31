<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkFoodPrices extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_food_prices', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->integer('food_id')->unsigned();
            $table->integer('option_type_index');
            $table->integer('price');
            $table->string('currency')->default('rsd');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_food_prices');
    }
}
