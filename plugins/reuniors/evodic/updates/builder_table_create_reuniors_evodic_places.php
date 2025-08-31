<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicPlaces extends Migration
{
    public function up()
{
    Schema::create('reuniors_evodic_places', function($table)
    {
        $table->engine = 'InnoDB';
        $table->increments('id')->unsigned();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
        $table->timestamp('deleted_at')->nullable();
        $table->string('title');
        $table->string('name');
        $table->text('description');
        $table->integer('type_id')->unsigned();
        $table->text('metadata');
        $table->smallInteger('active')->unsigned();
        $table->string('status');
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_evodic_places');
}
}
