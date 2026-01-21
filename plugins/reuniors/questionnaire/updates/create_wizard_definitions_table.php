<?php namespace Reuniors\Questionnaire\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

/**
 * CreateWizardDefinitionsTable Migration
 * 
 * Creates the main wizard_definitions table for storing wizard configurations.
 * Each wizard definition represents a complete multi-step workflow.
 */
class CreateWizardDefinitionsTable extends Migration
{
    public function up()
    {
        Schema::create('reuniors_wizard_definitions', function ($table) {
            $table->increments('id');
            
            // Identification
            $table->string('slug', 100)->unique()->comment('Unique identifier (e.g., "create-salon")');
            $table->string('name', 255)->comment('Display name');
            $table->text('description')->nullable()->comment('Wizard description');
            
            // Configuration
            $table->string('type', 50)->comment('Wizard type (e.g., "location_onboarding")');
            $table->boolean('is_active')->default(true)->comment('Is wizard currently active');
            $table->boolean('requires_auth')->default(true)->comment('Requires user authentication');
            $table->boolean('requires_approval')->default(true)->comment('Requires admin approval after completion');
            $table->boolean('auto_create_entities')->default(false)->comment('Auto-create entities on completion');
            
            // Target configuration
            $table->string('primary_entity_type', 100)->nullable()->comment('Primary entity class name');
            $table->string('primary_entity_table', 100)->nullable()->comment('Primary table name');
            
            // Metadata
            $table->text('metadata')->nullable()->comment('JSON field for additional configuration');
            
            // Timestamps
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('slug');
            $table->index('type');
            $table->index('is_active');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_wizard_definitions');
    }
}
