<?php namespace Reuniors\Base\Console;

use Illuminate\Console\Command;
use Reuniors\Base\Models\ConnectedDevice;
use Illuminate\Support\Facades\DB;

class ConsolidateConnectedDevicesCommand extends Command
{
    /**
     * @var string The console command name.
     */
    protected $signature = 'reuniors:consolidate-connected-devices';

    /**
     * @var string The console command description.
     */
    protected $description = 'Consolidate duplicate connected devices into single records with max 5 tokens per user per location';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting consolidation of connected devices...');

        // Get all unique user_id + location_slug combinations
        $combinations = DB::table('reuniors_base_connected_devices')
            ->select('user_id', 'location_slug')
            ->groupBy('user_id', 'location_slug')
            ->havingRaw('COUNT(*) > 1')
            ->get();

        $this->info("Found {$combinations->count()} user-location combinations with duplicates");

        $consolidated = 0;
        $deleted = 0;

        foreach ($combinations as $combo) {
            $this->info("Processing user_id: {$combo->user_id}, location: {$combo->location_slug}");

            // Get all devices for this user-location combo
            $devices = ConnectedDevice::where('user_id', $combo->user_id)
                ->where('location_slug', $combo->location_slug)
                ->orderBy('updated_at', 'desc')
                ->get();

            if ($devices->count() <= 1) {
                continue;
            }

            // Collect all tokens from all devices
            $allTokens = [];
            foreach ($devices as $device) {
                $tokens = $device->tokens ?? [];
                foreach ($tokens as $token => $tokenData) {
                    // Use token as key to avoid duplicates
                    if (!isset($allTokens[$token])) {
                        $allTokens[$token] = $tokenData;
                    } else {
                        // Keep the most recent last_used_at
                        $existingTime = strtotime($allTokens[$token]['last_used_at'] ?? '1970-01-01');
                        $newTime = strtotime($tokenData['last_used_at'] ?? '1970-01-01');
                        if ($newTime > $existingTime) {
                            $allTokens[$token] = $tokenData;
                        }
                    }
                }
            }

            // Sort by last_used_at descending (most recent first)
            uasort($allTokens, function ($a, $b) {
                $timeA = strtotime($a['last_used_at'] ?? '1970-01-01');
                $timeB = strtotime($b['last_used_at'] ?? '1970-01-01');
                return $timeB - $timeA; // Descending order
            });

            // Keep only the 5 most recent tokens
            $tokensToKeep = array_slice($allTokens, 0, 5, true);

            $this->info("  Found {$devices->count()} device records with " . count($allTokens) . " total tokens");
            $this->info("  Keeping " . count($tokensToKeep) . " most recent tokens");

            // Keep the first (most recently updated) device record
            $primaryDevice = $devices->first();
            $primaryDevice->tokens = $tokensToKeep;
            $primaryDevice->save();

            // Delete all other device records
            $devicesToDelete = $devices->slice(1);
            foreach ($devicesToDelete as $deviceToDelete) {
                $deviceToDelete->delete();
                $deleted++;
            }

            $consolidated++;
        }

        $this->info("Consolidation complete!");
        $this->info("Consolidated: {$consolidated} user-location combinations");
        $this->info("Deleted: {$deleted} duplicate device records");
    }
}

