<?php

namespace Reuniors\Questionnaire\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Validation\UnauthorizedException;
use mikp\sanctum\http\middleware\HasBearerToken;
use mikp\sanctum\http\middleware\UserFromBearerToken;
use Response;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Winter\User\Models\User;

class QuestionnaireToken extends HasBearerToken
{
    public function handle($request, Closure $next)
    {
        // get the authorization header
        $questionnaireCode = $request->get('code');
//        if (!$questionnaireCode) {
//            return (app(UserFromBearerToken::class))->handle($request, $next);
//        }
        // find a token matching the authorization
        $questionnaire = QuestionnaireRegistration::where('code', $questionnaireCode)
            ->notDeactivated()
            ->firstOrFail();

        $ip = $request->ip();
        $metadata = $questionnaire->metadata ?? [];
        if (!isset($metadata['ip'])) {
            $metadata['ip'] = [$ip];
        } else if (!in_array($ip, $metadata['ip'])) {
            if (count($metadata['ip']) < 3) {
                $metadata['ip'][] = $ip;
            } else {
                throw new UnauthorizedException('Too many different ip addresses');
            }
        }
        if (!$questionnaire->metadata || count($questionnaire->metadata) !== count($metadata)) {
            $questionnaire->update([
                'metadata' => $metadata
            ]);
        }

        // next
        return $next($request);
    }
}
