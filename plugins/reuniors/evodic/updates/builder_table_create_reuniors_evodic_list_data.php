<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicListData extends Migration
{
    public function up()
{
    Schema::create('reuniors_evodic_list_data', function($table)
    {
        $table->engine = 'InnoDB';
        $table->increments('id')->unsigned();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
        $table->timestamp('deleted_at')->nullable();
        $table->integer('list_id')->unsigned();
        $table->text('title');
        $table->integer('active')->unsigned();
        $table->integer('tag_id')->nullable()->unsigned();
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_evodic_list_data');
}
}
