<?php namespace Reuniors\Botovi\Http\Actions\V1\PersonReview;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\PersonReview;
use Illuminate\Support\Facades\Auth;

class PersonReviewApproveAction extends BaseAction
{
    public function rules()
    {
        return [
            'reviewId' => ['required', 'string', 'exists:reuniors_botovi_person_reviews,id'],
            'admin_notes' => ['nullable', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        
        // Check admin permissions
        if (!$user->hasPermission('reuniors.botovi.manage_reviews')) {
            throw new \Exception('Unauthorized');
        }

        $review = PersonReview::findOrFail($attributes['reviewId']);
        
        $review->approve($attributes['admin_notes'] ?? null);

        return $review;
    }
}
