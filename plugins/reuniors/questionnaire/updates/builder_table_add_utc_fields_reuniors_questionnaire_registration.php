<?php namespace Reuniors\Questionnaire\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddUtcFieldsReuniorsQuestionnaireRegistration extends Migration
{
    public function up()
    {
        Schema::table('reuniors_questionnaire_registration', function($table)
        {
            $table->timestamp('deactivate_at_utc')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_questionnaire_registration', function($table)
        {
            $table->dropColumn('deactivate_at_utc');
        });
    }
}
