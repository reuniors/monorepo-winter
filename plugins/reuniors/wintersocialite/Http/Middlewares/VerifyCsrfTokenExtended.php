<?php namespace Reuniors\WinterSocialite\Http\Middlewares;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;

class VerifyCsrfTokenExtended extends VerifyCsrfToken
{
    protected $except = [
        'api/*',
    ];
}
