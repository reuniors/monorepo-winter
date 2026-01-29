<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Stats;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\ClientReservation;
use Winter\User\Models\User;
use Carbon\Carbon;

/**
 * GetAdminStatsAction
 * 
 * Returns platform-wide statistics for admin dashboard
 */
class GetAdminStatsAction extends BaseAction
{
    public function handle(array $attributes = [])
    {
        $totalLocations = Location::count();
        $activeLocations = Location::where('active', true)->count();
        $totalUsers = User::count();

        // Reservations this month
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();
        $reservationsThisMonth = ClientReservation::whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->count();

        // Reservations today
        $reservationsToday = ClientReservation::whereDate('created_at', Carbon::today())
            ->count();

        // New users this month
        $newUsersThisMonth = User::whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->count();

        // New locations this month
        $newLocationsThisMonth = Location::whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->count();

        return [
            'totalLocations' => $totalLocations,
            'activeLocations' => $activeLocations,
            'inactiveLocations' => $totalLocations - $activeLocations,
            'totalUsers' => $totalUsers,
            'reservationsThisMonth' => $reservationsThisMonth,
            'reservationsToday' => $reservationsToday,
            'newUsersThisMonth' => $newUsersThisMonth,
            'newLocationsThisMonth' => $newLocationsThisMonth,
        ];
    }
}
