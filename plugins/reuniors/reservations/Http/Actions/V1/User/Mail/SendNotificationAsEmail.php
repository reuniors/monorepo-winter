<?php
namespace Reuniors\Reservations\Http\Actions\V1\User\Mail;

use Reuniors\Base\Http\Actions\BaseAction;
use mysql_xdevapi\Exception;
use Mail;

class SendNotificationAsEmail extends BaseAction {
    public function rules(): array
    {
        return [
            'user' => ['required', 'object'],
            'tableData' => ['array'],
            'title' => ['string'],
            'description' => ['string'],
            'link' => 'string',
            'subject' => 'string',
            'locationTitle' => ['string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = $attributes['user'];
        $tableData = $attributes['tableData'] ?? [];
        $title = $attributes['title'] ?? null;
        $description = $attributes['description'] ?? null;
        $link = $attributes['link'] ?? null;
        $subject = $attributes['subject'] ?? __('Obaveštenje') . ' - ' . date('d.m.Y');
        $locationTitle = $attributes['locationTitle'] ?? null;

        Mail::sendTo($user, 'reuniors.reservations::mail.notification', [
            'title' => $title,
            'description' => $description,
            'tableData' => $tableData,
            'link' => $link,
            'subject' => $subject,
            'locationTitle' => $locationTitle,
        ], function ($message) use ($subject, $locationTitle) {
            $message->subject($subject);
            // Set sender name as location title if provided
            if ($locationTitle) {
                $message->from(env('MAIL_FROM_ADDRESS', 'noreply@rzr.rs'), $locationTitle);
            }
        });

        return true;
    }
}
