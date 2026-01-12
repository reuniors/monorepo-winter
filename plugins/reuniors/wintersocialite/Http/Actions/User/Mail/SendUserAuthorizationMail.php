<?php namespace reuniors\wintersocialite\Http\Actions\User\Mail;

use Reuniors\Base\Http\Actions\BaseAction;
use Mail;

class SendUserAuthorizationMail extends BaseAction 
{
    public function handle(array $attributes = [], $user = null)
    {
        $fromName = env('APP_NAME', 'CMS');
        
        Mail::sendTo($user, 'reuniors.wintersocialite::mail.authorization-confirmation', [
            'code' => $user->activation_code
        ], function ($message) use ($fromName) {
            $message->subject(__('Potvrda email adrese'));
            $message->from(env('MAIL_FROM_ADDRESS', 'noreply@example.com'), $fromName);
        });
    }

    public function asController($user = null): array
    {
        return parent::asController($user);
    }
}
