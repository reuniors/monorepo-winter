<?php namespace reuniors\questionnaire\Http\Middleware;

use Auth;
use Closure;
use Response;

class UserHasGroupsOrOwnership
{
    public function handle($request, Closure $next, $routeName, ...$groups)
    {
        // get the authorization header
        $user = Auth::getUser();

        if (!$user) {
            return Response::make('Unauthorized', 401);
        }

        $object = $request->route($routeName);

        $userGroups = $user->groups->pluck('code')->toArray();

        if (!empty($userGroups)) {
            if (count(array_intersect($userGroups, $groups))) {
                return $next($request);
            }
        }

        if ($user->id == $object->user_id) {
            return $next($request);
        }

        return Response::make('Unauthorized', 401);
    }
}
