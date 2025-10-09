<?php namespace Reuniors\Botovi\Http\Actions\V1\PersonComment;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Person;
use Reuniors\Botovi\Models\PersonComment;
use Illuminate\Support\Facades\Auth;

class PersonCommentCreateAction extends BaseAction
{
    public function rules()
    {
        return [
            'personId' => ['required', 'integer', 'exists:reuniors_botovi_people,id'],
            'content' => ['required', 'string', 'max:1000'],
            'is_anonymous' => ['nullable', 'boolean'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        $person = Person::findOrFail($attributes['personId']);

        $comment = PersonComment::create([
            'person_id' => $person->id,
            'user_id' => $attributes['is_anonymous'] ? null : $user->id,
            'content' => $attributes['content'],
            'is_anonymous' => $attributes['is_anonymous'] ?? false,
            'status' => 'pending',
        ]);

        return $comment;
    }
}
