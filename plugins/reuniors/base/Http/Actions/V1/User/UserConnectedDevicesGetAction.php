<?php namespace Reuniors\Base\Http\Actions\V1\User;

use Illuminate\Http\Request;
use Winter\User\Models\User;
use Reuniors\Base\Models\ConnectedDevice;

class UserConnectedDevicesGetAction
{
    public function handle(Request $request, $userId)
    {
        $locationSlug = $request->input('locationSlug');

        if (!$locationSlug) {
            return response()->json([
                'success' => false,
                'message' => 'Location slug is required',
            ], 400);
        }

        // Get user
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ], 404);
        }

        // Get connected devices for this user and location
        $devices = ConnectedDevice::where('user_id', $userId)
            ->where('location_slug', $locationSlug)
            ->orderBy('updated_at', 'desc')
            ->get();

        $fullName = trim(($user->name ?? '') . ' ' . ($user->surname ?? ''));
        if (empty($fullName)) {
            $fullName = $user->username ?? $user->email ?? 'N/A';
        }

        // Transform devices data from tokens JSON structure
        $devicesData = [];
        if ($devices->isNotEmpty()) {
            foreach ($devices as $connectedDevice) {
                $tokens = $connectedDevice->tokens ?? [];
                foreach ($tokens as $token => $tokenData) {
                    $devicesData[] = [
                        'id' => $connectedDevice->id,
                        'deviceId' => $token,
                        'deviceName' => $tokenData['device'] ?? 'Unknown Device',
                        'platform' => $this->detectPlatform($tokenData['device'] ?? ''),
                        'isActive' => true,
                        'lastUsedAt' => isset($tokenData['last_used_at']) 
                            ? date('c', strtotime($tokenData['last_used_at'])) 
                            : null,
                    ];
                }
            }
        }

        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'fullName' => $fullName,
                    'email' => $user->email,
                    'phoneNumber' => $user->username,
                ],
                'devices' => $devicesData,
            ],
        ]);
    }

    private function detectPlatform($deviceString)
    {
        $deviceLower = strtolower($deviceString);
        
        if (strpos($deviceLower, 'iphone') !== false || strpos($deviceLower, 'ipad') !== false || strpos($deviceLower, 'ios') !== false) {
            return 'ios';
        }
        
        if (strpos($deviceLower, 'android') !== false) {
            return 'android';
        }
        
        return 'web';
    }
}

