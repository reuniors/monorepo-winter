<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableDeleteReuniorsKnkFoodTypePrices extends Migration
{
    public function up()
    {
        Schema::dropIfExists('reuniors_knk_food_type_prices');
    }

    public function down()
    {
        Schema::create('reuniors_knk_food_type_prices', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->integer('food_id')->unsigned();
            $table->double('price', 10, 0);
            $table->string('currency', 191)->default('rsd');
            $table->double('price_discount', 10, 0)->nullable();
            $table->integer('food_class_type_id')->unsigned();
            $table->bigInteger('sort_order')->unsigned()->default(0);
        });
    }
}
