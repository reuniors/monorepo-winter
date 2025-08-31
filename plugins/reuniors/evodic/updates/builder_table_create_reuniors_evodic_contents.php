<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicContents extends Migration
{
    public function up()
{
    Schema::create('reuniors_evodic_contents', function($table)
    {
        $table->engine = 'InnoDB';
        $table->increments('id')->unsigned();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
        $table->timestamp('deleted_at')->nullable();
        $table->text('data');
        $table->string('type');
        $table->text('metadata')->nullable();
        $table->smallInteger('active')->unsigned()->default(0);
        $table->bigInteger('sort_order')->unsigned()->default(0);
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_evodic_contents');
}
}
