<?php namespace Reuniors\Calendar\Http\Actions\V1;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Calendar\Models\CalendarConnection;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class CalendarWebhookAction
{
    use AsAction;

    /**
     * Handle calendar push notification webhook
     */
    public function handle(Request $request)
    {
        try {
            // Validate webhook headers
            $channelId = $request->header('X-Goog-Channel-ID');
            $resourceId = $request->header('X-Goog-Resource-ID');
            $resourceState = $request->header('X-Goog-Resource-State');

            if (!$channelId || !$resourceId) {
                Log::warning('Calendar webhook missing required headers');
                return response()->json(['error' => 'Missing required headers'], 400);
            }

            // Find connection by channel_id
            $connection = CalendarConnection::where('channel_id', $channelId)
                ->where('resource_id', $resourceId)
                ->first();

            if (!$connection) {
                Log::warning('Calendar webhook: Connection not found', [
                    'channel_id' => $channelId,
                    'resource_id' => $resourceId,
                ]);
                return response()->json(['error' => 'Connection not found'], 404);
            }

            // Handle different resource states
            if ($resourceState === 'exists') {
                // Event was created or updated
                Log::info('Calendar webhook: Event changed', [
                    'connection_id' => $connection->id,
                    'provider' => $connection->provider,
                    'channel_id' => $channelId,
                ]);
                
                // TODO: Implement full event sync from provider
            } elseif ($resourceState === 'not_exists') {
                // Event was deleted
                Log::info('Calendar webhook: Event deleted', [
                    'connection_id' => $connection->id,
                    'provider' => $connection->provider,
                    'channel_id' => $channelId,
                ]);
            }

            // Always return 200 OK to acknowledge receipt
            return response()->json(['success' => true], 200);
        } catch (\Exception $e) {
            Log::error('Calendar webhook error: ' . $e->getMessage(), [
                'exception' => $e,
            ]);
            
            // Still return 200 to prevent provider from retrying
            return response()->json(['error' => 'Internal error'], 200);
        }
    }

    public function asController(Request $request)
    {
        return $this->handle($request);
    }
}

