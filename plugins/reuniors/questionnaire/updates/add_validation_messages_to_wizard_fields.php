<?php namespace Reuniors\Questionnaire\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

/**
 * Add validation_messages column to wizard_fields for custom validation messages (JSON).
 */
class AddValidationMessagesToWizardFields extends Migration
{
    public function up()
    {
        Schema::table('reuniors_wizard_fields', function ($table) {
            if (!Schema::hasColumn('reuniors_wizard_fields', 'validation_messages')) {
                $table->text('validation_messages')->nullable()->after('validation_rules');
            }
        });
    }

    public function down()
    {
        Schema::table('reuniors_wizard_fields', function ($table) {
            if (Schema::hasColumn('reuniors_wizard_fields', 'validation_messages')) {
                $table->dropColumn('validation_messages');
            }
        });
    }
}
