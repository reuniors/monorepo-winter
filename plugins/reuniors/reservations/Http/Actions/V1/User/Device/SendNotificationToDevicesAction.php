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
        \Log::info('[SendNotificationToDevicesAction] START sendNotification', [
            'deviceTokens_count' => count($deviceTokens),
            'title' => $title,
            'php_version' => PHP_VERSION,
        ]);
        
        try {
            \Log::info('[SendNotificationToDevicesAction] About to call app(firebase.messaging)');
            $messaging = app('firebase.messaging');
            \Log::info('[SendNotificationToDevicesAction] Firebase messaging resolved successfully');
            
            $notification = Notification::create($title, $body);
            \Log::info('[SendNotificationToDevicesAction] Notification created');
            
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
            \Log::info('[SendNotificationToDevicesAction] CloudMessage created');

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
            
            \Log::info('[SendNotificationToDevicesAction] All notifications sent successfully');
        } catch (\Exception $e) {
            \Log::error('[SendNotificationToDevicesAction] EXCEPTION in sendNotification', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw $e;
        }
    }

    public function handle(array $attributes = [])
    {
        \Log::info('[SendNotificationToDevicesAction] START handle', [
            'attributes' => $attributes,
            'php_version' => PHP_VERSION,
        ]);
        
        try {
            $title = $attributes['title'];
            $body = $attributes['body'];
            $icon = $attributes['icon'] ?? null;
            $data = $attributes['data'] ?? [];
            $usersIds = $attributes['usersIds'];
            
            \Log::info('[SendNotificationToDevicesAction] About to query ConnectedDevice', [
                'usersIds' => $usersIds,
            ]);
            
            $connectedDevices = ConnectedDevice::whereIn('user_id', $usersIds)
                ->get();
            
            \Log::info('[SendNotificationToDevicesAction] ConnectedDevices fetched', [
                'count' => $connectedDevices->count(),
            ]);

            foreach ($connectedDevices as $connectedDevice) {
                $deviceTokens = array_keys($connectedDevice->tokens);
                \Log::info('[SendNotificationToDevicesAction] About to sendNotification', [
                    'device_id' => $connectedDevice->id,
                    'tokens_count' => count($deviceTokens),
                ]);
                $this->sendNotification($deviceTokens, $title, $body, $data, $icon);
            }

            \Log::info('[SendNotificationToDevicesAction] handle completed successfully');
            return null;
        } catch (\Exception $e) {
            \Log::error('[SendNotificationToDevicesAction] EXCEPTION in handle', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw $e;
        }
    }
}
