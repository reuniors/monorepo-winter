<?php namespace Reuniors\Questionnaire\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

/**
 * Add user_id to questionnaire_registration so we can list "my wizard runs".
 * Nullable column with FK to users table.
 */
class AddUserIdToQuestionnaireRegistration extends Migration
{
    public const FK_NAME = 'req_reg_user_fk';

    public function up()
    {
        Schema::table('reuniors_questionnaire_registration', function ($table) {
            if (!Schema::hasColumn('reuniors_questionnaire_registration', 'user_id')) {
                $table->unsignedInteger('user_id')->nullable()->after('id')->comment('User who started this wizard run');
                $table->index('user_id');
                $table->foreign('user_id', self::FK_NAME)
                    ->references('id')
                    ->on('users')
                    ->onDelete('set null');
            }
        });
    }

    public function down()
    {
        Schema::table('reuniors_questionnaire_registration', function ($table) {
            if (Schema::hasColumn('reuniors_questionnaire_registration', 'user_id')) {
                $table->dropForeign(self::FK_NAME);
                $table->dropIndex(['user_id']);
                $table->dropColumn('user_id');
            }
        });
    }
}
