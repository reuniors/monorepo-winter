<?php namespace reuniors\wintersocialite\Http\Actions\User\Mail;

use Reuniors\Base\Http\Actions\BaseAction;
use Mail;

class SendUserAuthorizationMail extends BaseAction {
    public function handle($user)
    {
        Mail::sendTo($user, 'reuniors.wintersocialite::mail.authorization-confirmation', [
            'code' => $user->activation_code
        ]);
    }
}
