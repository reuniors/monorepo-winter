<?php namespace reuniors\wintersocialite\Http\Actions\User\Mail;

use Lorisleiva\Actions\Concerns\AsAction;
use Mail;

class SendUserAuthorizationMail
{
    use AsAction;

    public function handle($user)
    {
        Mail::sendTo($user, 'reuniors.wintersocialite::mail.authorization-confirmation', [
            'code' => $user->activation_code
        ]);
    }
}
