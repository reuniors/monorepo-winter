<?php namespace Reuniors\Base\Http\Actions\V1\User;

use Illuminate\Http\Request;
use Winter\User\Models\User;
use Reuniors\Base\Models\ConnectedDevice;

class UserListGetAction
{
    public function handle(Request $request)
    {
        $locationSlug = $request->input('locationSlug');
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 20);
        $search = $request->input('search');

        if (!$locationSlug) {
            return response()->json([
                'success' => false,
                'message' => 'Location slug is required',
            ], 400);
        }

        // Build query
        $query = User::query();

        // Apply search filter
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('surname', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Order by created_at desc
        $query->orderBy('created_at', 'desc');

        // Paginate
        $users = $query->paginate($perPage, ['*'], 'page', $page);

        // Get user IDs to check for connected devices
        $userIds = $users->pluck('id')->toArray();
        $usersWithDevices = ConnectedDevice::whereIn('user_id', $userIds)
            ->where('location_slug', $locationSlug)
            ->distinct('user_id')
            ->pluck('user_id')
            ->toArray();

        // Transform users data
        $usersData = $users->map(function ($user) use ($usersWithDevices) {
            $fullName = trim(($user->name ?? '') . ' ' . ($user->surname ?? ''));
            if (empty($fullName)) {
                $fullName = $user->username ?? $user->email ?? 'N/A';
            }

            return [
                'id' => $user->id,
                'fullName' => $fullName,
                'email' => $user->email,
                'phoneNumber' => $user->username,
                'hasConnectedDevices' => in_array($user->id, $usersWithDevices),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => [
                'data' => $usersData,
                'currentPage' => $users->currentPage(),
                'lastPage' => $users->lastPage(),
                'perPage' => $users->perPage(),
                'total' => $users->total(),
            ],
        ]);
    }
}
