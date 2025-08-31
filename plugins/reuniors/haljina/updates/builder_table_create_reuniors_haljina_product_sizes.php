<?php namespace Reuniors\Haljina\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsHaljinaProductSizes extends Migration
{
    public function up()
{
    Schema::create('reuniors_haljina_product_sizes', function($table)
    {
        $table->engine = 'InnoDB';
        $table->increments('id')->unsigned();
        $table->string('title');
        $table->string('name');
        $table->smallInteger('active')->default(0);
        $table->integer('user_id')->nullable()->unsigned();
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_haljina_product_sizes');
}
}
