<?php namespace Reuniors\Haljina\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsHaljinaProducts extends Migration
{
    public function up()
    {
        Schema::create('reuniors_haljina_products', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('name');
            $table->string('slug');
            $table->string('title');
            $table->text('description')->nullable();
            $table->smallInteger('active');
            $table->dateTime('activate_at')->nullable();
            $table->dateTime('deactivate_at')->nullable();
            $table->integer('user_id')->nullable();
            $table->double('price', 10, 0);
            $table->string('status');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_haljina_products');
    }
}
