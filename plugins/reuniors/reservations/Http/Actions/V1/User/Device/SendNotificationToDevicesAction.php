<?php namespace Reuniors\Reservations\Http\Actions\V1\User\Device;

use Reuniors\Base\Http\Actions\BaseAction;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Kreait\Firebase\Messaging\MessageTarget;
use Reuniors\Reservations\Models\ConnectedDevice;

class SendNotificationToDevicesAction extends BaseAction {
    public function rules()
    {
        return [
            'title' => ['required', 'string'],
            'body' => ['required', 'string'],
            'icon' => ['string'],
            'data' => ['array'],
            'usersIds' => ['required', 'array'],
        ];
    }

    public function sendNotification(array $deviceTokens, $title, $body, $data, $icon)
    {
        $messaging = app('firebase.messaging');
        $notification = Notification::create($title, $body);
        $message = CloudMessage::new()
            ->withNotification($notification)
            ->withWebPushConfig([
                'notification' => [
                    'title' => $title,
                    'body' => $body,
                    'icon' => env('APP_URL') . '/themes/rzr/assets/img/ic_favicon.png',
                ],
                'data' => $data,
            ]);

        logger()->error(implode(', ', $deviceTokens));
        logger()->error(implode(', ', $data));

        foreach ($deviceTokens as $token) {
            try {
                $messaging->send($message->withChangedTarget('token', $token));
            } catch (\Kreait\Firebase\Exception\MessagingException $e) {
                // Handle the exception or log errors
                logger()->error('Firebase messaging failed: ' . $e->getMessage());
            } catch (\Kreait\Firebase\Exception\FirebaseException $e) {
                // General Firebase exceptions
                logger()->error('Firebase error: ' . $e->getMessage());
            }
        }
    }

    public function handle(array $attributes = [])
    {
        $title = $attributes['title'];
        $body = $attributes['body'];
        $icon = $attributes['icon'] ?? null;
        $data = $attributes['data'] ?? [];
        $usersIds = $attributes['usersIds'];
        $connectedDevices = ConnectedDevice::whereIn('user_id', $usersIds)
            ->get();

        foreach ($connectedDevices as $connectedDevice) {
            $deviceTokens = array_keys($connectedDevice->tokens);
            $this->sendNotification($deviceTokens, $title, $body, $data, $icon);
        }

        return null;
    }

    public function asController()
    {
        $requestData = request()->all();

        return [
            'data' => $this->handle($requestData),
            'success' => true,
        ];
    }
}
