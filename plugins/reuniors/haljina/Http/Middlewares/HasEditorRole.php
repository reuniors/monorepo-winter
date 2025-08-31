<?php namespace Reuniors\Haljina\Http\Middlewares;

use Closure;
use Winter\User\Facades\Auth;

class HasEditorRole
{
    public function handle($request, Closure $next)
    {
        $user = Auth::getUser();
        $user->load('groups');
        $userGroups = $user->groups->lists('code');
        if (!$user->is_superuser && !in_array('editor', $userGroups)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
