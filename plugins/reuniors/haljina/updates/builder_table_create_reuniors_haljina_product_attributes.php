<?php namespace Reuniors\Haljina\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsHaljinaProductAttributes extends Migration
{
    public function up()
{
    Schema::create('reuniors_haljina_product_attributes', function($table)
    {
        $table->engine = 'InnoDB';
        $table->increments('id')->unsigned();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
        $table->timestamp('deleted_at')->nullable();
        $table->string('name');
        $table->string('title');
        $table->string('slug');
        $table->string('type');
        $table->string('description', 5000)->nullable();
        $table->smallInteger('active')->default(0);
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_haljina_product_attributes');
}
}
