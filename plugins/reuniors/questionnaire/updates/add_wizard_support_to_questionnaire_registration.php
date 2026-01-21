<?php namespace Reuniors\Questionnaire\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

/**
 * AddWizardSupportToQuestionnaireRegistration Migration
 * 
 * Adds wizard-related columns to the existing questionnaire_registration table
 * to support wizard progress tracking and data storage.
 */
class AddWizardSupportToQuestionnaireRegistration extends Migration
{
    public function up()
    {
        Schema::table('reuniors_questionnaire_registration', function ($table) {
            // Wizard relationship
            $table->unsignedInteger('wizard_definition_id')->nullable()->after('id')->comment('Associated wizard');
            
            // Progress tracking
            $table->unsignedInteger('current_step_id')->nullable()->comment('Current/last completed step');
            $table->integer('completed_steps_count')->default(0)->comment('Number of completed steps');
            $table->integer('total_steps_count')->default(0)->comment('Total steps in wizard');
            
            // Status
            $table->string('wizard_status', 50)->default('draft')->comment('draft, in_progress, completed, approved, rejected');
            
            // Wizard data storage
            $table->text('wizard_data')->nullable()->comment('JSON storage for all wizard step data');
            
            // Completion
            $table->timestamp('wizard_started_at')->nullable()->comment('When wizard was started');
            $table->timestamp('wizard_completed_at')->nullable()->comment('When all steps completed');
            
            // Expiration
            $table->timestamp('expires_at')->nullable()->comment('Wizard expiration date');
            
            // Foreign key
            $table->foreign('wizard_definition_id')
                  ->references('id')
                  ->on('reuniors_wizard_definitions')
                  ->onDelete('set null');
            
            $table->foreign('current_step_id')
                  ->references('id')
                  ->on('reuniors_wizard_steps')
                  ->onDelete('set null');
            
            // Indexes
            $table->index('wizard_definition_id');
            $table->index('current_step_id');
            $table->index('wizard_status');
            $table->index('expires_at');
        });
    }

    public function down()
    {
        Schema::table('reuniors_questionnaire_registration', function ($table) {
            $table->dropForeign(['wizard_definition_id']);
            $table->dropForeign(['current_step_id']);
            $table->dropColumn([
                'wizard_definition_id',
                'current_step_id',
                'completed_steps_count',
                'total_steps_count',
                'wizard_status',
                'wizard_data',
                'wizard_started_at',
                'wizard_completed_at',
                'expires_at',
            ]);
        });
    }
}
