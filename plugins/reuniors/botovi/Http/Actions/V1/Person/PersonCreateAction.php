<?php namespace Reuniors\Botovi\Http\Actions\V1\Person;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Person;
use Reuniors\Botovi\Models\PersonActivityLog;
use Auth;

class PersonCreateAction extends BaseAction
{
    public function rules()
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'city_id' => ['required', 'integer', 'exists:reuniors_base_cities,id'],
            'birth_city_id' => ['nullable', 'integer', 'exists:reuniors_base_cities,id'],
            'address' => ['nullable', 'string'],
            'jmbg' => ['nullable', 'string', 'size:13', 'unique:reuniors_botovi_people,jmbg'],
            'parent_names' => ['nullable', 'string'],
            'children_names' => ['nullable', 'string'],
            'birth_date' => ['nullable', 'date'],
            'main_category_id' => ['required', 'integer', 'exists:reuniors_botovi_categories,id'],
            'type' => ['required', 'string', 'in:bot,caci,neutral'],
            'description' => ['nullable', 'string'],
            'snippet' => ['nullable', 'string'],
            'categories' => ['nullable', 'array'],
            'categories.*' => ['integer', 'exists:reuniors_botovi_categories,id'],
            'groups' => ['nullable', 'array'],
            'groups.*' => ['integer', 'exists:reuniors_botovi_groups,id'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['integer', 'exists:reuniors_base_tags,id'],
            'avatar' => ['nullable', 'file', 'image', 'max:2048'],
            'cover_image' => ['nullable', 'file', 'image', 'max:2048'],
            'gallery' => ['nullable', 'array'],
            'gallery.*' => ['file', 'image', 'max:2048'],
            'documents' => ['nullable', 'array'],
            'documents.*' => ['file', 'max:5120'],
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
        
        if (!$user) {
            throw new \Exception('User not authenticated');
        }
        
        // Create person
        $person = new Person([
            'first_name' => $attributes['first_name'],
            'last_name' => $attributes['last_name'],
            'city_id' => $attributes['city_id'],
            'birth_city_id' => $attributes['birth_city_id'] ?? null,
            'address' => $attributes['address'] ?? null,
            'jmbg' => $attributes['jmbg'] ?? null,
            'parent_names' => $attributes['parent_names'] ?? null,
            'children_names' => $attributes['children_names'] ?? null,
            'birth_date' => $attributes['birth_date'] ?? null,
            'main_category_id' => $attributes['main_category_id'],
            'type' => $attributes['type'],
            'description' => $attributes['description'] ?? null,
            'snippet' => $attributes['snippet'] ?? null,
            'status' => 'pending',
            'active' => false,
            'created_by' => $user->id,
            'metadata' => $attributes['metadata'] ?? [],
            'other_data' => $attributes['other_data'] ?? [],
            'social_media_data' => $attributes['social_media_data'] ?? [],
            'contact_data' => $attributes['contact_data'] ?? [],
            'professional_data' => $attributes['professional_data'] ?? [],
            'criminal_record_data' => $attributes['criminal_record_data'] ?? [],
            'family_data' => $attributes['family_data'] ?? [],
            'education_data' => $attributes['education_data'] ?? [],
            'health_data' => $attributes['health_data'] ?? [],
            'financial_data' => $attributes['financial_data'] ?? [],
            'political_affiliation_data' => $attributes['political_affiliation_data'] ?? [],
            'public_opinion_data' => $attributes['public_opinion_data'] ?? [],
            'media_mentions_data' => $attributes['media_mentions_data'] ?? [],
            'events_data' => $attributes['events_data'] ?? [],
            'relationships_data' => $attributes['relationships_data'] ?? [],
            'tags_data' => $attributes['tags_data'] ?? [],
        ]);

        $person->save();

        // Handle file attachments
        if (isset($attributes['avatar'])) {
            $person->avatar()->create(['data' => $attributes['avatar']]);
        }
        if (isset($attributes['cover_image'])) {
            $person->cover_image()->create(['data' => $attributes['cover_image']]);
        }
        if (isset($attributes['gallery'])) {
            foreach ($attributes['gallery'] as $file) {
                $person->gallery()->create(['data' => $file]);
            }
        }
        if (isset($attributes['documents'])) {
            foreach ($attributes['documents'] as $file) {
                $person->documents()->create(['data' => $file]);
            }
        }

        // Handle relationships
        if (isset($attributes['categories'])) {
            $person->categories()->attach($attributes['categories']);
        }
        if (isset($attributes['groups'])) {
            $person->groups()->attach($attributes['groups']);
        }
        if (isset($attributes['tags'])) {
            $person->tags()->attach($attributes['tags']);
        }

        // Log activity
        PersonActivityLog::create([
            'person_id' => $person->id,
            'user_id' => $user->id,
            'action' => 'created',
            'description' => 'Person created',
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);

        return $person;
    }
}
