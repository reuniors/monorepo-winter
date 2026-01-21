<?php namespace Reuniors\Questionnaire\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

/**
 * CreateWizardFieldsTable Migration
 * 
 * Creates the wizard_fields table for storing field definitions.
 * Each field belongs to a step and can have parent-child relationships for complex fields.
 */
class CreateWizardFieldsTable extends Migration
{
    public function up()
    {
        Schema::create('reuniors_wizard_fields', function ($table) {
            $table->increments('id');
            
            // Relationships
            $table->unsignedInteger('wizard_step_id')->comment('Parent step');
            $table->unsignedInteger('parent_field_id')->nullable()->comment('For nested fields');
            
            // Identification
            $table->string('field_key', 100)->comment('Field key (e.g., "location_name")');
            $table->string('field_label', 255)->comment('Display label');
            $table->string('field_type', 50)->comment('Field type from FieldType enum');
            
            // Ordering and behavior
            $table->integer('sort_order')->default(0)->comment('Display order within step');
            $table->boolean('is_required')->default(false)->comment('Is field required');
            $table->boolean('is_visible')->default(true)->comment('Is field visible by default');
            $table->boolean('is_readonly')->default(false)->comment('Is field read-only');
            
            // Field configuration
            $table->text('default_value')->nullable()->comment('Default value (JSON for complex)');
            $table->string('placeholder', 255)->nullable()->comment('Placeholder text');
            $table->text('help_text')->nullable()->comment('Help text');
            
            // Target mapping
            $table->string('target_field_name', 100)->nullable()->comment('Target entity field');
            $table->string('target_field_path', 255)->nullable()->comment('For JSON fields: address_data->street');
            
            // Field-specific options
            $table->text('field_options')->nullable()->comment('JSON for field configuration');
            
            // Validation
            $table->text('validation_rules')->nullable()->comment('JSON field for validation');
            
            // Conditional logic (Phase 2)
            $table->text('conditions')->nullable()->comment('JSON for conditional display');
            
            // Metadata
            $table->text('metadata')->nullable()->comment('JSON for additional config');
            
            // Timestamps
            $table->timestamps();
            $table->softDeletes();
            
            // Foreign keys
            $table->foreign('wizard_step_id')
                  ->references('id')
                  ->on('reuniors_wizard_steps')
                  ->onDelete('cascade');
            
            $table->foreign('parent_field_id')
                  ->references('id')
                  ->on('reuniors_wizard_fields')
                  ->onDelete('cascade');
            
            // Indexes
            $table->index('wizard_step_id');
            $table->index('parent_field_id');
            $table->index('sort_order');
            $table->index('field_key');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_wizard_fields');
    }
}
