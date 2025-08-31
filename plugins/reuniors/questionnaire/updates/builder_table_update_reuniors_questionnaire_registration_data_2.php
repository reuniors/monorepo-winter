<?php namespace Reuniors\Questionnaire\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsQuestionnaireRegistrationData2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_questionnaire_registration_data', function($table)
        {
            $table->string('status')->default('draft');
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_questionnaire_registration_data', function($table)
        {
            $table->dropColumn('status');
        });
    }
}
