<?php namespace Reuniors\Base\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateReuniorsBaseQaQuestions extends Migration
{
    public function up()
    {
        Schema::create('reuniors_base_qa_questions', function($table)
        {
            $table->increments('id');
            $table->text('question');
            $table->text('answer')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_base_qa_questions');
    }
}
