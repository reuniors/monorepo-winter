<?php namespace Reuniors\Questionnaire\Updates;

use Reuniors\Questionnaire\Models\WizardDefinition;
use Reuniors\Questionnaire\Models\WizardStep;
use Reuniors\Questionnaire\Models\WizardField;
use Seeder;

/**
 * Seed test wizard: Create Salon
 * 
 * This creates a complete wizard definition for testing purposes
 */
class SeedTestWizard extends Seeder
{
    public function run()
    {
        // Check if wizard already exists
        $existingWizard = WizardDefinition::where('slug', 'create-salon')->first();
        if ($existingWizard) {
            echo "⚠️  Wizard 'create-salon' already exists. Skipping seed.\n";
            return;
        }

        // Create Wizard Definition
        $wizard = WizardDefinition::create([
            'slug' => 'create-salon',
            'name' => 'Kreiraj Salon',
            'description' => 'Kreiraj novi salon korak po korak',
            'type' => 'location_onboarding',
            'is_active' => true,
            'requires_auth' => true,
            'requires_approval' => true,
            'auto_create_entities' => false,
            'primary_entity_type' => 'Location',
            'primary_entity_table' => 'reuniors_reservations_locations',
            'metadata' => json_encode([
                'icon' => 'cut-outline',
                'completion_redirect_url' => '/profile/locations',
                'expiration_hours' => 24,
                'target_entities' => ['locations', 'workers'],
                'allow_draft' => true,
            ]),
        ]);

        // Step 1: Welcome (Informational)
        $step1 = WizardStep::create([
            'wizard_definition_id' => $wizard->id,
            'slug' => 'welcome',
            'name' => 'Dobrodošli',
            'description' => 'Ovaj wizard će vam pomoći da korak po korak kreirate svoj salon. Proces je jednostavan i traje oko 5 minuta.',
            'sort_order' => 1,
            'is_skippable' => true,
            'is_informational' => true,
            'target_entity_type' => null,
            'target_entity_table' => null,
        ]);

        // Step 2: Basic Information
        $step2 = WizardStep::create([
            'wizard_definition_id' => $wizard->id,
            'slug' => 'basic-info',
            'name' => 'Osnovne Informacije',
            'description' => 'Molimo unesite naziv i kratak opis vašeg salona.',
            'sort_order' => 2,
            'is_skippable' => false,
            'target_entity_type' => 'location',
            'target_entity_table' => 'reuniors_reservations_locations',
        ]);

        // Step 2 Fields
        WizardField::create([
            'wizard_step_id' => $step2->id,
            'field_key' => 'name',
            'field_type' => 'TextField',
            'field_label' => 'Naziv Salona',
            'field_order' => 1,
            'is_required' => true,
            'validation_rules' => [
                'required' => true,
                'min' => 3,
                'max' => 100,
            ],
            'validation_messages' => [
                'required' => 'Naziv salona je obavezan',
                'min' => 'Naziv mora imati najmanje 3 karaktera',
                'max' => 'Naziv može imati maksimalno 100 karaktera',
            ],
            'help_text' => 'Unesite naziv koji će vaši klijenti videti',
            'target_field_name' => 'name',
        ]);

        WizardField::create([
            'wizard_step_id' => $step2->id,
            'field_key' => 'description',
            'field_type' => 'TextAreaField',
            'field_label' => 'Opis',
            'field_order' => 2,
            'is_required' => false,
            'validation_rules' => [
                'max' => 500,
            ],
            'help_text' => 'Kratko opišite vaš salon (do 500 karaktera)',
            'target_field_name' => 'description',
        ]);

        WizardField::create([
            'wizard_step_id' => $step2->id,
            'field_key' => 'type',
            'field_type' => 'SelectField',
            'field_label' => 'Tip Salona',
            'field_order' => 3,
            'is_required' => true,
            'validation_rules' => [
                'required' => true,
                'in' => [0, 1],
            ],
            'field_config' => [
                'options' => [
                    ['value' => 0, 'label' => 'Berberin'],
                    ['value' => 1, 'label' => 'Restoran'],
                ],
            ],
            'target_field_name' => 'type',
        ]);

        // Step 3: Contact Information
        $step3 = WizardStep::create([
            'wizard_definition_id' => $wizard->id,
            'slug' => 'contact',
            'name' => 'Kontakt Podaci',
            'description' => 'Molimo unesite kontakt podatke vašeg salona.',
            'sort_order' => 3,
            'is_skippable' => false,
            'target_entity_type' => 'location',
            'target_entity_table' => 'reuniors_reservations_locations',
        ]);

        // Step 3 Fields
        WizardField::create([
            'wizard_step_id' => $step3->id,
            'field_key' => 'phone',
            'field_type' => 'TextField',
            'field_label' => 'Telefon',
            'field_order' => 1,
            'is_required' => true,
            'validation_rules' => [
                'required' => true,
                'regex' => '/^[0-9+\-\s()]+$/',
            ],
            'validation_messages' => [
                'required' => 'Telefon je obavezan',
                'regex' => 'Unesite ispravan broj telefona',
            ],
            'help_text' => 'Format: +381 11 123 4567',
            'target_field_name' => 'phone',
        ]);

        WizardField::create([
            'wizard_step_id' => $step3->id,
            'field_key' => 'email',
            'field_type' => 'TextField',
            'field_label' => 'Email',
            'field_order' => 2,
            'is_required' => false,
            'validation_rules' => [
                'email' => true,
            ],
            'help_text' => 'Email adresa za kontakt',
            'target_field_name' => 'email',
        ]);

        WizardField::create([
            'wizard_step_id' => $step3->id,
            'field_key' => 'website',
            'field_type' => 'TextField',
            'field_label' => 'Website',
            'field_order' => 3,
            'is_required' => false,
            'validation_rules' => [
                'url' => true,
            ],
            'help_text' => 'Web sajt vašeg salona (opciono)',
            'target_field_name' => 'website',
        ]);

        // Step 4: Address (Optional)
        $step4 = WizardStep::create([
            'wizard_definition_id' => $wizard->id,
            'slug' => 'address',
            'name' => 'Adresa',
            'description' => 'Unesite adresu salona (ovaj korak možete preskočiti i dodati kasnije)',
            'sort_order' => 4,
            'is_skippable' => true,
            'target_entity_type' => 'location',
            'target_entity_table' => 'reuniors_reservations_locations',
        ]);

        // Step 4 Fields
        WizardField::create([
            'wizard_step_id' => $step4->id,
            'field_key' => 'street',
            'field_type' => 'TextField',
            'field_label' => 'Ulica',
            'field_order' => 1,
            'is_required' => false,
            'target_field_name' => 'street',
        ]);

        WizardField::create([
            'wizard_step_id' => $step4->id,
            'field_key' => 'street_number',
            'field_type' => 'TextField',
            'field_label' => 'Broj',
            'field_order' => 2,
            'is_required' => false,
            'target_field_name' => 'street_number',
        ]);

        WizardField::create([
            'wizard_step_id' => $step4->id,
            'field_key' => 'city',
            'field_type' => 'TextField',
            'field_label' => 'Grad',
            'field_order' => 3,
            'is_required' => false,
            'target_field_name' => 'city',
        ]);

        echo "✅ Test wizard 'create-salon' created successfully!\n";
        echo "   - 4 steps created\n";
        echo "   - " . WizardField::where('wizard_step_id', '>=', $step1->id)->count() . " fields created\n";
        echo "\nYou can now test the wizard in your app!\n";
    }
}
