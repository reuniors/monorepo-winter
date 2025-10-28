<?php

namespace Reuniors\Base\Http\Middlewares;

use mikp\sanctum\Http\Middleware\UserFromBearerToken;
use Auth;
use Closure;
use Winter\User\Models\User;

/**
 * Optional User Authentication from Bearer Token
 * 
 * This middleware attempts to authenticate a user from a bearer token,
 * but does NOT fail if the token is missing or invalid.
 * It simply continues without authentication in those cases.
 * 
 * Use this middleware when you want optional authentication - 
 * the route works both for authenticated and unauthenticated users.
 */
class UserFromBearerTokenOptional extends UserFromBearerToken
{
    public function handle($request, Closure $next)
    {
        // Get the authorization header
        $token = $request->bearerToken();
        
        // If no token, just continue without authentication
        if (!$token) {
            return $next($request);
        }

        return parent::handle($request, $next);
    }
}

