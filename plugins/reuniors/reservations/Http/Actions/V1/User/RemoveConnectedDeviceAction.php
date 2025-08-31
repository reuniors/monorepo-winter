<?php namespace Reuniors\Reservations\Http\Actions\V1\User;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Reservations\Models\ConnectedDevice;
use Auth;
use Reuniors\Reservations\Models\Location;

class RemoveConnectedDeviceAction
{
    use asAction;

    public function rules(): array
    {
        return [
            'locationSlug' => ['string'],
            'token' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes)
    {
        $user = Auth::getUser();
        $locationSlug = $attributes['locationSlug'] ?? null;
        $token = $attributes['token'];
        $connectedDeviceQuery = ConnectedDevice::where('user_id', $user->id)
            ->where('user_id', $user->id);
        if ($locationSlug !== null) {
            $locationData = Location::where('slug', $locationSlug)->firstOrFail();
            $connectedDeviceQuery->where('location_id', $locationData->id);
        }
        $connectedDevice = $connectedDeviceQuery->firstOrFail();

        $connectedDevice->location_id = $locationData->id ?? null;
        $connectedDevice->user_id = $user->id;
        $tokensData = $connectedDevice->tokens;
        $tokens = $connectedDevice->tokens
            ? array_keys($connectedDevice->tokens)
            : [];
        if (!in_array($token, $tokens)) {
            return null;
        }

        unset($tokensData[$token]);
        if (empty($tokensData)) {
            $connectedDevice->delete();
            return null;
        }
        uasort($tokensData, function ($a, $b) {
            return $a['last_used_at'] <=> $b['last_used_at'];
        });

        $connectedDevice->tokens = $tokensData;

        $connectedDevice->save();

        return null;
    }

    public function asController()
    {
        $requestData = request()->all();

        return [
            'data' => $this->handle($requestData),
            'success' => true,
        ];
    }
}
