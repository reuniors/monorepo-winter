<?php

namespace Reuniors\Questionnaire\Http\Middleware;

use Auth;
use Closure;
use Response;

class UserHasGroups
{
    public function handle($request, Closure $next, ...$groups)
    {
        // get the authorization header
        $user = Auth::getUser();

        if (!$user) {
            return Response::make('Unauthorized', 401);
        }

        $userGroups = $user->groups->pluck('code')->toArray();

        if (!empty($userGroups)) {
            if (count(array_intersect($userGroups, $groups))) {
                return $next($request);
            }
        }

        return Response::make('Unauthorized', 401);
    }
}
