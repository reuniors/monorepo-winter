<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicQaQuestions extends Migration
{
    public function up()
{
    Schema::create('reuniors_evodic_qa_questions', function($table)
    {
        $table->engine = 'InnoDB';
        $table->increments('id')->unsigned();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
        $table->timestamp('deleted_at')->nullable();
        $table->string('title');
        $table->smallInteger('active')->unsigned()->default(1);
        $table->text('metadata')->nullable();
        $table->integer('user_id')->nullable()->unsigned();
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_evodic_qa_questions');
}
}
