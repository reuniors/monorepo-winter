<?php namespace reuniors\wintersocialite\Http\Actions\User\Mail;

use Reuniors\Base\Http\Actions\BaseAction;
use Mail;

class SendUserAuthorizationMail extends BaseAction 
{
    public function handle(array $attributes = [], $user = null)
    {
        Mail::sendTo($user, 'reuniors.wintersocialite::mail.authorization-confirmation', [
            'code' => $user->activation_code
        ]);
    }

    public function asController($user = null): array
    {
        return parent::asController($user);
    }
}
