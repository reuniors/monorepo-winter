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
            'locationId' => ['required', 'integer'],
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

        $invalidTokens = [];
        foreach ($deviceTokens as $token) {
            try {
                $messaging->send($message->withChangedTarget('token', $token));
            } catch (\Kreait\Firebase\Exception\MessagingException $e) {
                // If token is not found, mark it for removal
                if (strpos($e->getMessage(), 'Requested entity was not found') !== false) {
                    $invalidTokens[] = $token;
                }
                logger()->error('Firebase messaging failed: ' . $e->getMessage());
            } catch (\Kreait\Firebase\Exception\FirebaseException $e) {
                // General Firebase exceptions
                logger()->error('Firebase error: ' . $e->getMessage());
            }
        }

        return $invalidTokens;
    }

    public function handle(array $attributes = [])
    {
        $title = $attributes['title'];
        $body = $attributes['body'];
        $icon = $attributes['icon'] ?? null;
        $data = $attributes['data'] ?? [];
        $usersIds = $attributes['usersIds'];
        $locationId = $attributes['locationId'];
        
        // Filter by location_id to ensure notifications are sent only to devices connected to this specific location
        $connectedDevices = ConnectedDevice::whereIn('user_id', $usersIds)
            ->where('location_id', $locationId)
            ->get();

        foreach ($connectedDevices as $connectedDevice) {
            $deviceTokens = array_keys($connectedDevice->tokens);
            $invalidTokens = $this->sendNotification($deviceTokens, $title, $body, $data, $icon);

            // Remove invalid tokens from the database
            if (!empty($invalidTokens)) {
                $tokensData = $connectedDevice->tokens;
                
                foreach ($invalidTokens as $invalidToken) {
                    unset($tokensData[$invalidToken]);
                }

                // If no tokens left, delete the connected device record
                if (empty($tokensData)) {
                    $connectedDevice->delete();
                } else {
                    // Update with remaining tokens
                    $connectedDevice->tokens = $tokensData;
                    $connectedDevice->save();
                }
            }
        }

        return null;
    }
}
