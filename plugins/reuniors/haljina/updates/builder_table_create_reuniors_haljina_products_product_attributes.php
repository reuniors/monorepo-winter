<?php namespace Reuniors\Haljina\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsHaljinaProductsProductAttributes extends Migration
{
    public function up()
{
    Schema::create('reuniors_haljina_products_product_attributes', function($table)
    {
        $table->engine = 'InnoDB';
        $table->integer('product_id')->unsigned();
        $table->integer('product_attribute_id')->unsigned();
        $table->string('value', 1000)->nullable();
        $table->primary(['product_id','product_attribute_id']);
        $table->foreign('product_attribute_id', 'product_attribute_products_p_a_id')->references('id')->on('reuniors_haljina_product_attributes')->onDelete('cascade');
        $table->foreign('product_id')->references('id')->on('reuniors_haljina_products')->onDelete('cascade');
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_haljina_products_product_attributes');
}
}
