<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkActions extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_actions', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('attachment_type');
            $table->integer('attachment_id')->nullable();
            $table->string('action_type');
            $table->longText('data')->nullable();
            $table->string('status');
            $table->integer('created_by')->unsigned();
            $table->integer('updated_by')->nullable()->unsigned();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_actions');
    }
}
