<?php

namespace Reuniors\reservations\Http\Actions\V1\Notification;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Http\Actions\V1\User\Device\SendNotificationToDevicesAction;
use Reuniors\Reservations\Http\Actions\V1\User\Mail\SendNotificationAsEmail;
use Reuniors\reservations\Http\Enums\NotificationStatus;
use Reuniors\Reservations\Models\Notification;

class NotificationCreateAction extends BaseAction {
    public function rules()
    {
        return [
            'title' => ['string'],
            'description' => ['required', 'string'],
            'usersIds' => ['required', 'array'],
            'reservationId' => ['integer'],
            'locationId' => ['integer'],
            'status' => ['string'],
            'sendEmail' => 'boolean',
            'sendSms' => 'boolean',
            'sendPush' => 'boolean',
            'emailData' => 'array',
        ];
    }

    public function handle(array $attributes)
    {
        $title = $attributes['title'] ?? null;
        $description = $attributes['description'];
        $usersIds = array_unique($attributes['usersIds']);
        $reservationId = $attributes['reservationId'] ?? null;
        $locationId = $attributes['locationId'] ?? null;
        $sendEmail = $attributes['sendEmail'] ?? false;
        $sendSms = $attributes['sendSms'] ?? false;
        $sendPush = $attributes['sendPush'] ?? false;
        $notificationData = $attributes['notificationData'] ?? [];
        $status = $attributes['status'] ?? NotificationStatus::NOT_SEEN;
        $emailData = $attributes['emailData'] ?? [];

        $notification = new Notification();
        $notification->description = $description;
        $notification->save();

        $notification->users()->attach($usersIds, ['status' => $status]);

        if ($reservationId) {
            $notification->client_reservations()->attach($reservationId);
        }

        if ($locationId) {
            $notification->location()->associate($locationId);
        }

        foreach ($notification->users()->get() as $user) {
            if ($sendEmail) {
                SendNotificationAsEmail::run([
                    'user' => $user,
                    'description' => $description,
                    'title' => $title,
                    ...$emailData
                ]);
            }
        }

        if ($sendPush && !empty($notificationData)) {
            SendNotificationToDevicesAction::run([
                'title' => $notificationData['title'] ?? $title,
                'body' => $description,
                'usersIds' => $usersIds,
                'data' => $notificationData
            ]);
        }

        return $notification->save();
    }

    public function asController()
    {
        $requestData = request()->all();
        return $this->handle($requestData);
    }
}
