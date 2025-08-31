<?php namespace Reuniors\Haljina\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsHaljinaCategoryProductAttributes extends Migration
{
    public function up()
{
    Schema::create('reuniors_haljina_category_product_attributes', function($table)
    {
        $table->engine = 'InnoDB';
        $table->integer('category_id')->unsigned();
        $table->integer('product_attribute_id')->unsigned();
        $table->primary(['category_id','product_attribute_id']);
        $table->foreign('category_id')->references('id')->on('reuniors_haljina_categories')->onDelete('cascade');
        $table->foreign('product_attribute_id', 'product_attribute_category_p_a_id')->references('id')->on('reuniors_haljina_product_attributes')->onDelete('cascade');
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_haljina_category_product_attributes');
}
}
