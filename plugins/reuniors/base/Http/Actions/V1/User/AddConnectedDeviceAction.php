<?php namespace Reuniors\Base\Http\Actions\V1\User;

use Jenssegers\Agent\Agent;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\ConnectedDevice;
use Auth;

class AddConnectedDeviceAction extends BaseAction {
    public function rules(): array
    {
        return [
            'locationSlug' => ['string', 'nullable'],
            'token' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        $locationSlug = $attributes['locationSlug'] ?? null;
        $token = $attributes['token'];
        $connectedDeviceQuery = ConnectedDevice::where('user_id', $user->id);
        if ($locationSlug !== null) {
            $connectedDeviceQuery->where('location_slug', $locationSlug);
        } else {
            $connectedDeviceQuery->whereNull('location_slug');
        }
        $connectedDevice = $connectedDeviceQuery->first();
        if (empty($connectedDevice)) {
            $connectedDevice = new ConnectedDevice();
        }

        $connectedDevice->location_slug = $locationSlug;
        $connectedDevice->user_id = $user->id;
        $tokensData = $connectedDevice->tokens ?? [];
        
        // Check if token already exists - if yes, just update last_used_at
        if (isset($tokensData[$token])) {
            $tokensData[$token]['last_used_at'] = now();
            $connectedDevice->tokens = $tokensData;
            $connectedDevice->save();
            return null;
        }
        
        // If we have 5 or more tokens, remove the oldest one
        if (count($tokensData) >= 5) {
            // Sort by last_used_at to find the oldest
            uasort($tokensData, function ($a, $b) {
                return strtotime($a['last_used_at']) <=> strtotime($b['last_used_at']);
            });
            
            // Remove the oldest (first) token
            $oldestToken = array_key_first($tokensData);
            unset($tokensData[$oldestToken]);
        }
        
        // Add new token
        $deviceAgent = new Agent();
        $tokensData[$token] = [
            'last_used_at' => now(),
            'device' => $deviceAgent->device() . ' ' . $deviceAgent->platform() . ' ' . $deviceAgent->browser(),
        ];
        
        $connectedDevice->tokens = $tokensData;

        $connectedDevice->save();

        return null;
    }
}

