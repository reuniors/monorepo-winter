<?php namespace Reuniors\Botovi\Http\Actions\V1\PersonReview;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Person;
use Reuniors\Botovi\Models\PersonReview;
use Illuminate\Support\Facades\Auth;

class PersonReviewCreateAction extends BaseAction
{
    public function rules()
    {
        return [
            'personId' => ['required', 'integer', 'exists:reuniors_botovi_people,id'],
            'rating' => ['required', 'integer', 'min:1', 'max:10'],
            'comment' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        $person = Person::findOrFail($attributes['personId']);

        // Check if user already reviewed this person
        $existingReview = PersonReview::where('person_id', $person->id)
            ->where('user_id', $user->id)
            ->first();

        if ($existingReview) {
            throw new \Exception('You have already reviewed this person');
        }

        $review = PersonReview::create([
            'person_id' => $person->id,
            'user_id' => $user->id,
            'rating' => $attributes['rating'],
            'comment' => $attributes['comment'] ?? null,
            'status' => 'pending',
        ]);

        return $review;
    }
}
