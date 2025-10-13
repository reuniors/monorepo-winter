<?php namespace Reuniors\Botovi\Http\Actions\V1\Person;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Person;
use Reuniors\Botovi\Models\PersonActivityLog;
use Illuminate\Support\Facades\Auth;

class PersonUpdateAction extends BaseAction
{
    public function rules()
    {
        return [
            'personId' => ['required', 'integer', 'exists:reuniors_botovi_people,id'],
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
            'type' => ['nullable', 'string', 'in:bot,caci,neutral'],
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
        $person = Person::findOrFail($attributes['personId']);
        $user = Auth::getUser();
        
        // Check permissions
        if ($person->created_by !== $user->id && !$user->hasPermission('reuniors.botovi.manage_persons')) {
            throw new \Exception('Unauthorized');
        }

        // Update fields
        $updateFields = array_filter($attributes, function($key) {
            return !in_array($key, ['personId', 'avatar', 'cover_image', 'gallery', 'documents', 'categories', 'groups', 'tags']);
        }, ARRAY_FILTER_USE_KEY);

        $person->fill($updateFields);
        $person->last_updated_by = $user->id;
        $person->save();

        // Handle file attachments
        if (isset($attributes['avatar'])) {
            $person->avatar()->delete();
            $person->avatar()->create(['data' => $attributes['avatar']]);
        }
        if (isset($attributes['cover_image'])) {
            $person->cover_image()->delete();
            $person->cover_image()->create(['data' => $attributes['cover_image']]);
        }
        if (isset($attributes['gallery'])) {
            $person->gallery()->delete();
            foreach ($attributes['gallery'] as $file) {
                $person->gallery()->create(['data' => $file]);
            }
        }
        if (isset($attributes['documents'])) {
            $person->documents()->delete();
            foreach ($attributes['documents'] as $file) {
                $person->documents()->create(['data' => $file]);
            }
        }

        // Handle relationships
        if (isset($attributes['categories'])) {
            $person->categories()->sync($attributes['categories']);
        }
        if (isset($attributes['groups'])) {
            $person->groups()->sync($attributes['groups']);
        }
        if (isset($attributes['tags'])) {
            $person->tags()->sync($attributes['tags']);
        }

        // Log activity
        PersonActivityLog::create([
            'person_id' => $person->id,
            'user_id' => $user->id,
            'action' => 'updated',
            'description' => 'Person updated',
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);

        return $person;
    }
}
