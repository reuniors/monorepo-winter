<?php namespace Reuniors\Questionnaire\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

/**
 * CreateWizardStepsTable Migration
 * 
 * Creates the wizard_steps table for storing individual wizard steps.
 * Each step can have multiple fields and targets a specific entity.
 */
class CreateWizardStepsTable extends Migration
{
    public function up()
    {
        Schema::create('reuniors_wizard_steps', function ($table) {
            $table->increments('id');
            
            // Relationships
            $table->unsignedInteger('wizard_definition_id')->comment('Parent wizard');
            
            // Identification
            $table->string('slug', 100)->comment('Step identifier (e.g., "address-info")');
            $table->string('name', 255)->comment('Step display name');
            $table->text('description')->nullable()->comment('Step description/instructions');
            
            // Ordering and behavior
            $table->integer('sort_order')->default(0)->comment('Display order');
            $table->boolean('is_skippable')->default(false)->comment('Can user skip this step');
            $table->boolean('is_informational')->default(false)->comment('No input fields, just information');
            
            // Target configuration
            $table->string('target_entity_type', 100)->nullable()->comment('Entity this step creates/updates');
            $table->string('target_entity_table', 100)->nullable()->comment('Table name');
            $table->string('data_storage_strategy', 50)->default('json')->comment('How to store: json, separate_fields, multiple_tables');
            
            // Validation
            $table->text('validation_rules')->nullable()->comment('JSON field for validation rules');
            
            // Conditional logic (Phase 2)
            $table->text('conditions')->nullable()->comment('JSON field for conditional display');
            
            // Metadata
            $table->text('metadata')->nullable()->comment('JSON field for step configuration');
            
            // Timestamps
            $table->timestamps();
            $table->softDeletes();
            
            // Foreign key
            $table->foreign('wizard_definition_id')
                  ->references('id')
                  ->on('reuniors_wizard_definitions')
                  ->onDelete('cascade');
            
            // Indexes
            $table->unique(['wizard_definition_id', 'slug']);
            $table->index('wizard_definition_id');
            $table->index('sort_order');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_wizard_steps');
    }
}
