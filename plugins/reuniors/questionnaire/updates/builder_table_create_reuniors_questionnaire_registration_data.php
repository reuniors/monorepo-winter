<?php namespace Reuniors\Questionnaire\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsQuestionnaireRegistrationData extends Migration
{
    public function up()
    {
        Schema::create('reuniors_questionnaire_registration_data', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->integer('questionnaire_registration_id')->unsigned();
            $table->text('data');
            $table->string('type');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_questionnaire_registration_data');
    }
}
