<?php
namespace Reuniors\Reservations\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * AdminOnly Middleware
 * 
 * Ensures only users with 'admin' group can access admin routes
 */
class AdminOnly
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if (!$user || !$user->inGroup('admin')) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'UNAUTHORIZED',
                    'message' => 'Admin access required',
                ]
            ], 403);
        }

        return $next($request);
    }
}
