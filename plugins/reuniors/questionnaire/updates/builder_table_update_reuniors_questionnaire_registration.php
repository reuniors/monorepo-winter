<?php namespace Reuniors\Questionnaire\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsQuestionnaireRegistration extends Migration
{
    public function up()
    {
        Schema::table('reuniors_questionnaire_registration', function($table)
        {
            $table->string('title');
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_questionnaire_registration', function($table)
        {
            $table->dropColumn('title');
        });
    }
}
