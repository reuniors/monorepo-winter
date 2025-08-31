<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicPlaceTypes extends Migration
{
    public function up()
{
    Schema::create('reuniors_evodic_place_types', function($table)
    {
        $table->engine = 'InnoDB';
        $table->increments('id')->unsigned();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
        $table->timestamp('deleted_at')->nullable();
        $table->string('title');
        $table->string('name');
        $table->text('description')->nullable();
        $table->smallInteger('is_active')->unsigned();
        $table->text('metadata')->nullable();
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_evodic_place_types');
}
}
