<?php namespace Reuniors\Botovi\Http\Actions\V1\Person;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Person;
use Reuniors\Botovi\Models\PersonView;

class PersonGetOneAction extends BaseAction
{
    public function rules()
    {
        return [
            'personId' => ['required', 'integer', 'exists:reuniors_botovi_people,id'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $person = Person::with([
            'city', 'birth_city', 'main_category', 'categories', 'groups', 'tags',
            'avatar', 'cover_image', 'gallery', 'documents',
            'events', 'comments', 'reviews', 'views'
        ])->findOrFail($attributes['personId']);

        // Create view record
        PersonView::create([
            'person_id' => $person->id,
            'user_id' => auth()->id(),
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);

        return $person;
    }
}
