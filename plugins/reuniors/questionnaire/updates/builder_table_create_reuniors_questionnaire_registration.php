<?php namespace Reuniors\Questionnaire\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsQuestionnaireRegistration extends Migration
{
    public function up()
{
    Schema::create('reuniors_questionnaire_registration', function($table)
    {
        $table->engine = 'InnoDB';
        $table->increments('id')->unsigned();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
        $table->timestamp('deleted_at')->nullable();
        $table->string('code');
        $table->timestamp('deactivate_at');
        $table->smallInteger('active')->default(1);
        $table->text('metadata')->nullable();
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_questionnaire_registration');
}
}
