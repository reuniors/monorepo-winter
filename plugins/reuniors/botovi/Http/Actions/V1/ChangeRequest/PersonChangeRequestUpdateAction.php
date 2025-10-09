<?php namespace Reuniors\Botovi\Http\Actions\V1\ChangeRequest;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\ChangeRequest;
use Reuniors\Botovi\Models\Person;
use Illuminate\Support\Facades\Auth;

class PersonChangeRequestUpdateAction extends BaseAction
{
    public function rules()
    {
        return [
            'personId' => ['required', 'integer', 'exists:reuniors_botovi_people,id'],
            'scheduled_date_utc' => ['required', 'date', 'after:today'],
            'first_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['nullable', 'string', 'max:255'],
            'city_id' => ['nullable', 'integer', 'exists:reuniors_base_cities,id'],
            'birth_city_id' => ['nullable', 'integer', 'exists:reuniors_base_cities,id'],
            'address' => ['nullable', 'string'],
            'jmbg' => ['nullable', 'string', 'size:13', 'unique:reuniors_botovi_people,jmbg'],
            'parent_names' => ['nullable', 'string'],
            'children_names' => ['nullable', 'string'],
            'birth_date' => ['nullable', 'date'],
            'main_category_id' => ['nullable', 'integer', 'exists:reuniors_botovi_categories,id'],
            'type' => ['nullable', 'string', 'in:bot,cacija,neutral'],
            'description' => ['nullable', 'string'],
            'snippet' => ['nullable', 'string'],
            'categories' => ['nullable', 'array'],
            'categories.*' => ['integer', 'exists:reuniors_botovi_categories,id'],
            'groups' => ['nullable', 'array'],
            'groups.*' => ['integer', 'exists:reuniors_botovi_groups,id'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['integer', 'exists:reuniors_base_tags,id'],
            'metadata' => ['nullable', 'array'],
            'other_data' => ['nullable', 'array'],
            'social_media_data' => ['nullable', 'array'],
            'contact_data' => ['nullable', 'array'],
            'professional_data' => ['nullable', 'array'],
            'criminal_record_data' => ['nullable', 'array'],
            'family_data' => ['nullable', 'array'],
            'education_data' => ['nullable', 'array'],
            'health_data' => ['nullable', 'array'],
            'financial_data' => ['nullable', 'array'],
            'political_affiliation_data' => ['nullable', 'array'],
            'public_opinion_data' => ['nullable', 'array'],
            'media_mentions_data' => ['nullable', 'array'],
            'events_data' => ['nullable', 'array'],
            'relationships_data' => ['nullable', 'array'],
            'tags_data' => ['nullable', 'array'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        $person = Person::findOrFail($attributes['personId']);
        
        // Check permissions
        if ($person->created_by !== $user->id && !$user->hasPermission('reuniors.botovi.manage_persons')) {
            throw new \Exception('Unauthorized');
        }

        $changeRequest = ChangeRequest::create([
            'entity_type' => 'person',
            'entity_id' => $person->id,
            'action_class' => 'Reuniors\Botovi\Http\Actions\V1\Person\PersonUpdateAction',
            'data' => $attributes,
            'action_data' => $attributes,
            'change_type' => 'update',
            'scheduled_date' => $attributes['scheduled_date_utc'],
            'status' => 'pending',
            'created_by' => $user->id
        ]);

        return [
            'success' => true,
            'message' => 'Change request created successfully',
            'changeRequestId' => $changeRequest->id,
            'scheduledDateUtc' => $attributes['scheduled_date_utc']
        ];
    }
}
