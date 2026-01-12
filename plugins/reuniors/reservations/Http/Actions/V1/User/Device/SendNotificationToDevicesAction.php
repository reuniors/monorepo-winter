<?php namespace Reuniors\Reservations\Http\Actions\V1\User\Device;

use Reuniors\Base\Http\Actions\BaseAction;
use Kreait\Firebase\Messaging\CloudMessage;
use Reuniors\Base\Models\ConnectedDevice;
use Reuniors\Reservations\Models\Location;

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
        
        // Prepare notification metadata - merge with existing data
        $notificationMeta = array_merge([
            'timestamp' => now()->toIso8601String(),
        ], $data);
        
        // FCM data payload must be a flat map of string => string.
        // Convert all metadata values to strings, JSON-encoding complex values.
        foreach ($notificationMeta as $key => $value) {
            if (is_array($value) || is_object($value)) {
                $notificationMeta[$key] = json_encode($value);
            } elseif (!is_null($value)) {
                $notificationMeta[$key] = (string) $value;
            } else {
                $notificationMeta[$key] = '';
            }
        }
        
        // Build data-only payload for SW handling (same as SendTestNotificationAction)
        // We JSON-encode the "notification" and "data" structures so that
        // the service worker can parse them back into objects.
        $payloadData = [
            'notification' => json_encode([
                'title' => $title,
                'body' => $body,
                'image' => $icon ? (env('APP_URL') . $icon) : null,
            ]),
            'data' => json_encode($notificationMeta),
        ];
        
        // Create message with data-only payload (no withNotification to avoid duplicate)
        $message = CloudMessage::new()
            ->withData($payloadData)
            ->withWebPushConfig([
                'fcm_options' => [
                    'link' => $data['url'] ?? ($data['click_action'] ?? env('APP_URL', 'https://rzr.rs')),
                ],
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
        
        // Convert location_id to location_slug
        $location = Location::findOrFail($locationId);
        $locationSlug = $location->slug;
        
        // Filter by location_slug to ensure notifications are sent only to devices connected to this specific location
        $connectedDevices = ConnectedDevice::whereIn('user_id', $usersIds)
            ->where('location_slug', $locationSlug)
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
