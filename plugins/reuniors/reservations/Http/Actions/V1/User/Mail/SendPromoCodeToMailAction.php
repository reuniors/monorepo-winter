<?php namespace Reuniors\Reservations\Http\Actions\V1\User\Mail;

use Carbon\Carbon;
use Lorisleiva\Actions\Concerns\AsAction;
use Mail;
use Reuniors\reservations\Http\Enums\ReservationStatus;
use Reuniors\Reservations\Models\Client;
use Reuniors\Reservations\Models\PromoCode;
use Winter\User\Models\User;

class SendPromoCodeToMailAction
{
    use asAction;

    public function rules(): array
    {
        return [
            'users' => ['array'],
            'title' => ['string'],
            'description' => ['string'],
            'link' => 'string',
            'slug' => 'string',
            'promoCode' => 'string',
        ];
    }

    public function handle(array $attributes = [])
    {
        $promoCode = $attributes['promoCode'] ?? 'crni30#';
        $title = $attributes['title'] ?? "Podsetnik za POPUST, unesite promo kod: $promoCode prilikom zakazivanja";
        $description = $attributes['description'] ?? 'Zakažite svoj termin na vreme i iskoristite popust od 30% na sve usluge. Promo period traje do crnog petka.';
        $link = $attributes['link'] ?? 'https://berbernica-tanja.rzr.rs/zakazivanje';
        $slug = $attributes['slug'] ?? 'berbernica-tanja';

        $users = User::query()
            ->isActivated()
            ->get();

        $userIds = $users->pluck('id');

        $clients = $userIds ? Client::query()
            ->whereIn('user_id', $userIds)
            ->with('clientReservations', function ($query) use ($promoCode, $slug) {
                $query
                    ->whereDate('date', '>=', Carbon::now('Europe/Belgrade'))
                    ->whereIn('status', [ReservationStatus::CONFIRMED, ReservationStatus::PENDING]);
            })
            ->get()
            ->keyBy('user_id'): null;

        foreach ($users as $user) {
            $promoCodeQuery = PromoCode::isActive()
                ->exists($promoCode, $slug);
            $promoCodeData = null;
            $client = null;

            if ($clients && isset($clients[$user->id]) && $client = $clients[$user->id]) {
                if (!$client->clientReservations->isEmpty()) {
                    continue;
                }
                $promoCodeData = $promoCodeQuery->notUsed($client->id)->first();
            }

            if (!$client || $promoCodeData) {
                $clientName = $client ? $client->full_name : 'unknown';
                Mail::sendTo($user, 'reuniors.reservations::mail.black_friday', [
                    'title' => $title,
                    'description' => $description,
                    'link' => $link,
                ]);
                logger()->info("Mail sent to {$user->email} id: {$user->id}, name: {$clientName}");
            }
        }
    }
}
