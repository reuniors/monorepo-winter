<?php namespace Reuniors\Botovi\Http\Actions\V1\Person;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Person;
use Reuniors\Botovi\Models\PersonView;

class PersonGetOneAction extends BaseAction
{
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], Person $person = null)
    {
        $person->load([
            'city', 'birth_city', 'main_category', 'categories', 'groups', 'tags',
            'avatar', 'cover_image', 'gallery', 'documents',
            'events', 'comments', 'reviews', 'views'
        ]);

        return $person;
    }

    public function asController(Person $person = null): array
    {
        return parent::asController($person);
    }
}
