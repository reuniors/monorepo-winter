<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicQaAnswers extends Migration
{
    public function up()
{
    Schema::create('reuniors_evodic_qa_answers', function($table)
    {
        $table->engine = 'InnoDB';
        $table->increments('id')->unsigned();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
        $table->timestamp('deleted_at')->nullable();
        $table->integer('qa_question_id')->unsigned();
        $table->text('text');
        $table->smallInteger('active')->unsigned()->default(1);
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_evodic_qa_answers');
}
}
