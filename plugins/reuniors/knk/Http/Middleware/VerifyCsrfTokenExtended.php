<?php namespace Reuniors\Knk\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;

class VerifyCsrfTokenExtended extends VerifyCsrfToken
{
    protected $except = [
        'api/*',
    ];
}
