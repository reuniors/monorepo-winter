<?php namespace Reuniors\Base\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;
use Reuniors\Base\Models\ConnectedDevice;
use Illuminate\Support\Facades\DB;

class AddUniqueConstraintToConnectedDevices extends Migration
{
    public function up()
    {
        // First, consolidate duplicate connected devices
        $this->consolidateDuplicates();
        
        // Then add unique constraint
        Schema::table('reuniors_base_connected_devices', function ($table) {
            $table->unique(['user_id', 'location_slug'], 'user_location_unique');
        });
    }

    public function down()
    {
        Schema::table('reuniors_base_connected_devices', function ($table) {
            $table->dropUnique('user_location_unique');
        });
    }

    protected function consolidateDuplicates()
    {
        // Get all unique user_id + location_slug combinations with duplicates
        $combinations = DB::table('reuniors_base_connected_devices')
            ->select('user_id', 'location_slug')
            ->groupBy('user_id', 'location_slug')
            ->havingRaw('COUNT(*) > 1')
            ->get();

        foreach ($combinations as $combo) {
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
                return $timeB - $timeA;
            });

            // Keep only the 5 most recent tokens
            $tokensToKeep = array_slice($allTokens, 0, 5, true);

            // Keep the first (most recently updated) device record
            $primaryDevice = $devices->first();
            $primaryDevice->tokens = $tokensToKeep;
            $primaryDevice->save();

            // Delete all other device records
            $devicesToDelete = $devices->slice(1);
            foreach ($devicesToDelete as $deviceToDelete) {
                $deviceToDelete->delete();
            }
        }
    }
}

