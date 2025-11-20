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
        $tokensData = $connectedDevice->tokens;
        $tokens = $connectedDevice->tokens
            ? array_keys($connectedDevice->tokens)
            : [];
        if (in_array($token, $tokens)) {
            return null;
        } elseif (count($tokens) >= 5) {
            array_shift($tokens);
        }
        $deviceAgent = new Agent();
        $tokensData[$token] = [
            'last_used_at' => now(),
            'device' => $deviceAgent->device() . ' ' . $deviceAgent->platform() . ' ' . $deviceAgent->browser(),
        ];
        uasort($tokensData, function ($a, $b) {
            return $a['last_used_at'] <=> $b['last_used_at'];
        });

        $connectedDevice->tokens = $tokensData;

        $connectedDevice->save();

        return null;
    }
}

