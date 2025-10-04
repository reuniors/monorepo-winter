<?php namespace Reuniors\Questionnaire\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableMakeOriginalFieldsNullableReuniorsQuestionnaire extends Migration
{
    public function up()
    {
        // Make original fields nullable in questionnaire_registration table
        Schema::table('reuniors_questionnaire_registration', function($table)
        {
            $table->datetime('deactivate_at')->nullable()->change();
        });
    }
    
    public function down()
    {
        // Revert questionnaire_registration table
        Schema::table('reuniors_questionnaire_registration', function($table)
        {
            $table->datetime('deactivate_at')->nullable(false)->change();
        });
    }
}
