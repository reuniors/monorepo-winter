<?php namespace Reuniors\Haljina\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsHaljinaCurrencies extends Migration
{
    public function up()
{
    Schema::create('reuniors_haljina_currencies', function($table)
    {
        $table->engine = 'InnoDB';
        $table->increments('id')->unsigned();
        $table->string('name');
        $table->string('title');
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_haljina_currencies');
}
}
