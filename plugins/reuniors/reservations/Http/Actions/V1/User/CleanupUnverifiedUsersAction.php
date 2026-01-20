<?php
namespace Reuniors\Reservations\Http\Actions\V1\User;

use Reuniors\Base\Http\Actions\BaseAction;
use Winter\User\Models\User;
use Reuniors\Reservations\Models\Client;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

/**
 * Scheduled action to delete unverified users who:
 * - Don't have a client relationship
 * - Haven't confirmed email (persist_code is NULL)
 * - Never logged in (last_login is NULL)
 * - Created more than 2 days ago (created_at older than 2 days)
 * 
 * All four conditions must be met for deletion.
 */
class CleanupUnverifiedUsersAction extends BaseAction
{
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [])
    {
        $this->info('Starting cleanup of unverified users...');

        // Find users that meet all deletion criteria:
        // 1. No client relationship (doesn't exist in reuniors_reservations_clients table)
        // 2. persist_code is NULL (email not confirmed)
        // 3. last_login is NULL (never logged in)
        // 4. created_at is older than 2 days
        // Use left join to check for clients - more reliable than relationship
        $twoDaysAgo = now()->subDays(2);
        $usersToDelete = DB::table('users')
            ->leftJoin('reuniors_reservations_clients', 'users.id', '=', 'reuniors_reservations_clients.user_id')
            ->whereNull('users.persist_code')
            ->whereNull('users.last_login')
            ->whereNull('reuniors_reservations_clients.user_id')
            ->where('users.created_at', '<', $twoDaysAgo)
            ->select('users.id', 'users.email')
            ->get();

        $this->info("Found {$usersToDelete->count()} users to delete");

        if ($usersToDelete->isEmpty()) {
            $this->info('No unverified users found for deletion.');
            return [
                'deleted' => 0,
                'total' => 0,
                'message' => 'No unverified users found for deletion'
            ];
        }

        $deletedCount = 0;
        $errors = [];

        foreach ($usersToDelete as $userData) {
            try {
                $user = User::find($userData->id);
                
                if (!$user) {
                    continue;
                }

                // Double-check conditions before deletion
                if (
                    is_null($user->persist_code) &&
                    is_null($user->last_login) &&
                    !Client::where('user_id', $user->id)->exists() &&
                    $user->created_at < $twoDaysAgo
                ) {
                    $user->forceDelete();
                    $deletedCount++;
                    $this->info("Deleted user ID: {$user->id}, Email: {$user->email}");
                } else {
                    $this->info("Skipped user ID: {$user->id} - conditions not met");
                }
            } catch (\Exception $e) {
                $errors[] = [
                    'userId' => $userData->id,
                    'email' => $userData->email ?? 'unknown',
                    'error' => $e->getMessage()
                ];

                Log::error('Failed to delete unverified user', [
                    'user_id' => $userData->id,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);

                $this->error("Failed to delete user ID: {$userData->id} - {$e->getMessage()}");
            }
        }

        $result = [
            'deleted' => $deletedCount,
            'failed' => count($errors),
            'errors' => $errors,
            'total' => $usersToDelete->count(),
            'message' => "Deleted: {$deletedCount}, Failed: " . count($errors) . ", Total: {$usersToDelete->count()}"
        ];

        $this->info("Cleanup complete: {$deletedCount} users deleted, " . count($errors) . " failed");

        return $result;
    }

    // Helper methods for console output
    protected function info($message)
    {
        Log::info($message);
    }

    protected function error($message)
    {
        Log::error($message);
    }
}
