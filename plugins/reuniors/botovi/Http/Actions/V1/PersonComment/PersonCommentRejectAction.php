<?php namespace Reuniors\Botovi\Http\Actions\V1\PersonComment;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\PersonComment;
use Illuminate\Support\Facades\Auth;

class PersonCommentRejectAction extends BaseAction
{
    public function rules()
    {
        return [
            'commentId' => ['required', 'integer', 'exists:reuniors_botovi_person_comments,id'],
            'rejection_reason' => ['required', 'string'],
            'admin_notes' => ['nullable', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        
        // Check admin permissions
        if (!$user->hasPermission('reuniors.botovi.manage_comments')) {
            throw new \Exception('Unauthorized');
        }

        $comment = PersonComment::findOrFail($attributes['commentId']);
        
        $comment->reject($attributes['rejection_reason'], $attributes['admin_notes'] ?? null);

        return $comment;
    }
}
