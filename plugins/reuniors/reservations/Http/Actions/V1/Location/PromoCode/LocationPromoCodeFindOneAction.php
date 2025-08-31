<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\PromoCode;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Reservations\Models\Client;
use Reuniors\Reservations\Models\PromoCode;
use Auth;

class LocationPromoCodeFindOneAction
{
    use asAction;

    public function rules()
    {
        return [
            'code' => ['required', 'string', 'max:20'],
            'locationSlug' => ['required', 'string', 'max:255']
        ];
    }

    public function handle(array $attributes)
    {
        $locationSlug = $attributes['locationSlug'];
        $code = $attributes['code'];
        $user = Auth::getUser();
        $client = Client::where('user_id', $user->id)
            ->first();

        $promoCodeQuery = PromoCode::isActive()
            ->exists($code, $locationSlug);

        if ($client) {
            $promoCodeQuery = $promoCodeQuery->notUsed($client->id);
        }

        return $promoCodeQuery
            ->first();
    }

    public function asController()
    {
        $requestData = request()->all();

        return [
            'success' => true,
            'data' => $this->handle($requestData),
        ];
    }
}
