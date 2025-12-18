<?php namespace Reuniors\Base\Http\Actions\V1\Notification;

use Illuminate\Http\Request;
use Reuniors\Base\Models\ConnectedDevice;
use Illuminate\Support\Facades\Log;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Kreait\Firebase\Factory;

class SendTestNotificationAction
{
    public function handle(Request $request)
    {
        $request->validate([
            'locationSlug' => 'required|string',
            'deviceId' => 'required|string',
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'type' => 'nullable|string|in:info,success,warning,error',
            'level' => 'nullable|integer|min:1|max:5',
            'data' => 'nullable|array',
        ]);

        $locationSlug = $request->input('locationSlug');
        $deviceId = $request->input('deviceId');
        $title = $request->input('title');
        $body = $request->input('body');
        $type = $request->input('type', 'info');
        $level = $request->input('level', 1);
        $data = $request->input('data', []);

        // Find the connected device for this location
        $connectedDevice = ConnectedDevice::where('location_slug', $locationSlug)->first();

        if (!$connectedDevice) {
            return response()->json([
                'success' => false,
                'message' => 'No connected devices found for this location',
            ], 404);
        }

        // Check if the deviceId (token) exists in tokens JSON
        $tokens = $connectedDevice->tokens ?? [];
        if (!isset($tokens[$deviceId])) {
            return response()->json([
                'success' => false,
                'message' => 'Device token not found',
            ], 404);
        }

        // The deviceId is actually the FCM token
        $fcmToken = $deviceId;

        try {
            // Get Firebase credentials path from env
            $credentialsPath = env('FIREBASE_CREDENTIALS');
            
            if (!$credentialsPath || !file_exists($credentialsPath)) {
                throw new \Exception('Firebase credentials file not found');
            }

            // Initialize Firebase
            $factory = (new Factory)->withServiceAccount($credentialsPath);
            $messaging = $factory->createMessaging();

            // Prepare notification data
            $notificationData = array_merge([
                'type' => $type,
                'level' => $level,
                'timestamp' => now()->toIso8601String(),
            ], $data);

            // Create notification
            $notification = Notification::create($title, $body);

            // Create message
            $message = CloudMessage::withTarget('token', $fcmToken)
                ->withNotification($notification)
                ->withData($notificationData);

            // Send notification
            $result = $messaging->send($message);

            // Log the test notification
            Log::info('Test notification sent', [
                'device_id' => $deviceId,
                'user_id' => $connectedDevice->user_id,
                'location_slug' => $locationSlug,
                'title' => $title,
                'result' => $result,
            ]);

            return response()->json([
                'success' => true,
                'data' => [
                    'sent' => true,
                    'messageId' => $result,
                ],
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to send test notification', [
                'device_id' => $deviceId,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to send notification: ' . $e->getMessage(),
            ], 500);
        }
    }
}

