<?php namespace Reuniors\Questionnaire\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

/**
 * Add admin_message column to questionnaire_registration.
 * Stores reason when admin rejects or returns for edit.
 */
class AddAdminMessageToQuestionnaireRegistration extends Migration
{
    public function up()
    {
        Schema::table('reuniors_questionnaire_registration', function ($table) {
            $table->text('admin_message')->nullable()->after('wizard_status')
                ->comment('Admin reason/message when status is rejected or returned_for_edit');
        });
    }

    public function down()
    {
        Schema::table('reuniors_questionnaire_registration', function ($table) {
            $table->dropColumn('admin_message');
        });
    }
}
