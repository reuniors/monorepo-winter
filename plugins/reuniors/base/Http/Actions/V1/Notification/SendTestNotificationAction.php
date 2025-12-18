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
            'userId' => 'required|integer|exists:users,id',
            'locationSlug' => 'required|string',
            'deviceId' => 'required|string',
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'type' => 'nullable|string|in:info,success,warning,error',
            'level' => 'nullable|integer|min:1|max:5',
            'clickAction' => 'nullable|string|url',
            'data' => 'nullable|array',
        ]);

        $userId = $request->input('userId');
        $locationSlug = $request->input('locationSlug');
        $deviceId = $request->input('deviceId');
        $title = $request->input('title');
        $body = $request->input('body');
        $type = $request->input('type', 'info');
        $level = $request->input('level', 1);
        $clickAction = $request->input('clickAction');
        $data = $request->input('data', []);

        // Find the connected device for this user and location
        // Search through all user's devices to find the token
        $connectedDevices = ConnectedDevice::where('user_id', $userId)
            ->where('location_slug', $locationSlug)
            ->get();

        if ($connectedDevices->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No connected devices found for this user and location',
            ], 404);
        }

        // Search for the token across all user's device records
        $fcmToken = null;
        foreach ($connectedDevices as $device) {
            $tokens = $device->tokens ?? [];
            if (isset($tokens[$deviceId])) {
                $fcmToken = $deviceId;
                break;
            }
        }

        if (!$fcmToken) {
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

            // Determine the click action URL (custom or default home page)
            $clickActionUrl = $clickAction ?: ('https://' . $locationSlug . '.rzr.rs/');

            // Prepare notification data
            $notificationData = array_merge([
                'type' => $type,
                'level' => $level,
                'timestamp' => now()->toIso8601String(),
                'click_action' => $clickActionUrl,
            ], $data);

            // Create notification
            $notification = Notification::create($title, $body);

            // Create message with web push config for PWA
            $message = CloudMessage::withTarget('token', $fcmToken)
                ->withNotification($notification)
                ->withData($notificationData)
                ->withWebPushConfig([
                    'fcm_options' => [
                        'link' => $clickActionUrl,
                    ],
                ]);

            // Send notification
            $result = $messaging->send($message);

            // Log the test notification
            Log::info('Test notification sent', [
                'device_id' => $deviceId,
                'user_id' => $userId,
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
                'user_id' => $userId,
                'error' => $e->getMessage(),
            ]);

            $message = $e->getMessage();

            // If token is invalid (not found / NotRegistered), remove it from database
            if (
                stripos($message, 'not found') !== false ||
                stripos($message, 'Requested entity was not found') !== false ||
                stripos($message, 'NotRegistered') !== false
            ) {
                
                // Find and remove the invalid token
                foreach ($connectedDevices as $device) {
                    $tokens = $device->tokens ?? [];
                    if (isset($tokens[$deviceId])) {
                        unset($tokens[$deviceId]);
                        
                        if (empty($tokens)) {
                            // If no tokens left, delete the device record
                            $device->delete();
                        } else {
                            // Otherwise just update with remaining tokens
                            $device->tokens = $tokens;
                            $device->save();
                        }
                        
                        Log::info('Removed invalid FCM token', [
                            'user_id' => $userId,
                            'device_id' => $deviceId,
                        ]);
                        break;
                    }
                }
                
                return response()->json([
                    'success' => false,
                    'message' => 'Token no longer valid and has been removed. Please refresh the page.',
                ], 410); // 410 Gone
            }

            return response()->json([
                'success' => false,
                'message' => 'Failed to send notification: ' . $e->getMessage(),
            ], 500);
        }
    }
}

