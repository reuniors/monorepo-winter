<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicLists extends Migration
{
    public function up()
{
    Schema::create('reuniors_evodic_lists', function($table)
    {
        $table->engine = 'InnoDB';
        $table->increments('id')->unsigned();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
        $table->timestamp('deleted_at')->nullable();
        $table->text('metadata')->nullable();
        $table->string('name');
        $table->text('description')->nullable();
        $table->string('type');
        $table->smallInteger('active')->default(1);
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_evodic_lists');
}
}
