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

        Mail::sendTo($user, 'reuniors.reservations::mail.notification', [
            'title' => $title,
            'description' => $description,
            'tableData' => $tableData,
            'link' => $link,
            'subject' => $subject,
        ], function ($message) use ($subject) {
            $message->subject($subject);
        });

        return true;
    }
}
