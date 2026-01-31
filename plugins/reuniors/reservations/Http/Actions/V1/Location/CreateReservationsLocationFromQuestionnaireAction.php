<?php namespace Reuniors\Reservations\Http\Actions\V1\Location;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Reuniors\Reservations\Models\Location;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Create a Reservations Location from an approved questionnaire registration.
 * Sets initial setup_progress with wizard_completed: true and other steps false.
 */
class CreateReservationsLocationFromQuestionnaireAction extends BaseAction
{
    public function rules(): array
    {
        return [
            'registration_id' => ['required', 'integer', 'exists:reuniors_questionnaire_registration,id'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $registration = QuestionnaireRegistration::find($attributes['registration_id']);

        if (!$registration) {
            throw new NotFoundHttpException('Questionnaire registration not found');
        }

        if ($registration->wizard_status !== QuestionnaireRegistration::STATUS_APPROVED) {
            throw new BadRequestHttpException(
                'Questionnaire must be approved before creating location. Current status: ' . $registration->wizard_status
            );
        }

        $wizardData = $registration->wizard_data ?? [];

        // Map wizard data to location fields (extend as wizard definition grows)
        $name = $wizardData['name'] ?? $wizardData['title'] ?? ('Location ' . $registration->id);
        $slug = Str::slug($name);
        $existingSlug = Location::where('slug', $slug)->exists();
        if ($existingSlug) {
            $slug = $slug . '-' . $registration->id;
        }

        $locationData = [
            'name' => $name,
            'title' => $name,
            'slug' => $slug,
            'description' => $wizardData['description'] ?? null,
            'has_multiple_activities' => $wizardData['has_multiple_activities'] ?? false,
            'city_id' => $wizardData['city_id'] ?? $wizardData['cityId'] ?? null,
            'address_data' => $wizardData['address_data'] ?? $wizardData['addressData'] ?? [],
            'phone_data' => $wizardData['phone_data'] ?? $wizardData['phoneData'] ?? [],
            'main_owner_id' => $registration->user_id,
            'active' => true,
            'setup_progress' => [
                'wizard_completed' => true,
                'workers_added' => false,
                'activities_added' => false,
                'services_added' => false,
                'working_hours_set' => false,
            ],
        ];

        $location = Location::create($locationData);

        return $location->load(['working_hours', 'workers', 'logo', 'cover', 'pwa_icon', 'gallery', 'serviceCategories']);
    }
}
