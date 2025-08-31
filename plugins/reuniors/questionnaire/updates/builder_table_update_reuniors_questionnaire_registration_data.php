<?php namespace Reuniors\Questionnaire\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsQuestionnaireRegistrationData extends Migration
{
    public function up()
    {
        Schema::table('reuniors_questionnaire_registration_data', function($table)
        {
            $table->integer('parent_data_id')->nullable()->unsigned();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_questionnaire_registration_data', function($table)
        {
            $table->dropColumn('parent_data_id');
        });
    }
}
