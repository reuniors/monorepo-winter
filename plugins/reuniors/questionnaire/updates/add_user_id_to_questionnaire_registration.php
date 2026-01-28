<?php namespace Reuniors\Questionnaire\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

/**
 * Add user_id to questionnaire_registration so we can list "my wizard runs".
 */
class AddUserIdToQuestionnaireRegistration extends Migration
{
    public function up()
    {
        Schema::table('reuniors_questionnaire_registration', function ($table) {
            if (!Schema::hasColumn('reuniors_questionnaire_registration', 'user_id')) {
                $table->unsignedInteger('user_id')->nullable()->after('id')->comment('User who started this wizard run');
                $table->index('user_id');
            }
        });
    }

    public function down()
    {
        Schema::table('reuniors_questionnaire_registration', function ($table) {
            if (Schema::hasColumn('reuniors_questionnaire_registration', 'user_id')) {
                $table->dropIndex(['user_id']);
                $table->dropColumn('user_id');
            }
        });
    }
}
