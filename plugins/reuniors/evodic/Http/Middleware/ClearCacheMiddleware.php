<?php namespace Reuniors\Evodic\Http\Middleware;

use Illuminate\Support\Facades\Cache;

class ClearCacheMiddleware
{
    public function handle($request, \Closure $next)
    {
        $response = $next($request);

        if ($request->method() === 'POST' || $request->method() === 'PUT' || $request->method() === 'DELETE') {
            Cache::rememberForever('scheduleCacheClear', function () {
                return true;
            });
        }
        return $response;
    }
}
