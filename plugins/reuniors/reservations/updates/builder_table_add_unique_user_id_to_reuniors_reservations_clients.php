<?php

namespace Reuniors\Reservations\Updates;

use Winter\Storm\Database\Updates\Migration;
use Schema;
use DB;

class BuilderTableAddUniqueUserIdToReuniorsReservationsClients extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_clients', function ($table) {
            // Step 1: Find all duplicate user_ids with their client IDs
            $duplicates = DB::select("
                SELECT 
                    user_id,
                    GROUP_CONCAT(id ORDER BY id SEPARATOR ',') as client_ids,
                    COUNT(*) as count_clients
                FROM reuniors_reservations_clients
                WHERE user_id IS NOT NULL
                    AND deleted_at IS NULL
                GROUP BY user_id
                HAVING count_clients > 1
            ");

            foreach ($duplicates as $duplicate) {
                $clientIds = explode(',', $duplicate->client_ids);
                $keepId = $clientIds[0]; // Keep the first (oldest) client
                $deleteIds = array_slice($clientIds, 1); // All others to delete

                // Step 2: Update client_id in client_reservations table to point to the kept client
                // This also handles promo codes since PromoCode uses client_id through ClientReservation
                // (PromoCode->hasMany->ClientReservation->belongsTo->Client via client_id)
                // PromoCode.scopeNotUsed() checks client_id in client_reservations, so updating
                // client_id here automatically fixes promo code relationships
                DB::table('reuniors_reservations_client_reservations')
                    ->whereIn('client_id', $deleteIds)
                    ->whereNull('deleted_at')
                    ->update(['client_id' => $keepId]);

                // Step 2b: Update client_id in client_stats table to point to the kept client
                // First, handle potential duplicates by deleting stats for duplicate clients
                // (since there's a unique constraint on ['client_id', 'location_id'])
                // We'll keep the stats for the kept client and remove duplicates
                foreach ($deleteIds as $deleteId) {
                    // Get all stats for the duplicate client
                    $duplicateStats = DB::table('reuniors_reservations_client_stats')
                        ->where('client_id', $deleteId)
                        ->get();
                    
                    foreach ($duplicateStats as $stat) {
                        // Check if stats already exist for kept client + location
                        $existingStat = DB::table('reuniors_reservations_client_stats')
                            ->where('client_id', $keepId)
                            ->where('location_id', $stat->location_id)
                            ->first();
                        
                        if ($existingStat) {
                            // If exists, delete the duplicate (keep the one for kept client)
                            DB::table('reuniors_reservations_client_stats')
                                ->where('id', $stat->id)
                                ->delete();
                        } else {
                            // If doesn't exist, update to point to kept client
                            DB::table('reuniors_reservations_client_stats')
                                ->where('id', $stat->id)
                                ->update(['client_id' => $keepId]);
                        }
                    }
                }

                // Step 3: Also check created_by column for problematic users
                // If there are reservations created_by this user_id but without client_id or with wrong client_id,
                // update them to use the kept client
                DB::table('reuniors_reservations_client_reservations')
                    ->where('created_by', $duplicate->user_id)
                    ->where(function($query) use ($deleteIds) {
                        $query->whereNull('client_id')
                              ->orWhereIn('client_id', $deleteIds);
                    })
                    ->whereNull('deleted_at')
                    ->update(['client_id' => $keepId]);

                // Step 4: Delete duplicate clients (hard delete)
                DB::table('reuniors_reservations_clients')
                    ->whereIn('id', $deleteIds)
                    ->delete();
            }

            // Step 5: Add unique index on user_id (allows multiple NULL values)
            $table->unique('user_id', 'reuniors_reservations_clients_user_id_unique');
        });
    }

    public function down()
    {
        Schema::table('reuniors_reservations_clients', function ($table) {
            $table->dropUnique('reuniors_reservations_clients_user_id_unique');
        });
    }
}
