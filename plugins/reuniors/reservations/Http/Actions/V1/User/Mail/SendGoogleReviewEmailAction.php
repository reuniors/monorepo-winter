<?php namespace Reuniors\Reservations\Http\Actions\V1\User\Mail;

use Carbon\Carbon;
use Reuniors\reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Client;
use Winter\User\Models\User;
use Mail;

class SendGoogleReviewEmailAction extends BaseAction
{
    public function handle(array $attributes = [])
    {
        logger()->info("Mail google review action started");

        $promoCode = $attributes['promoCode'] ?? 'google#';
        $title = $attributes['title'] ?? "Google Review | Promo 30% popusta";
        $description = $attributes['description'] ?? "Ocenite nas na google-u i iskoristite promo kod \"$promoCode\" i dobijate 30% popusta na sve usluge.";
        $link = $attributes['link'] ?? 'https://www.google.co.jp/search?sca_esv=d90a51759e2b0159&biw=2048&bih=934&q=berbernica+tanja+2002+%D0%BA%D1%80%D0%B0%D0%B3%D1%83%D1%98%D0%B5%D0%B2%D0%B0%D1%86+reviews&uds=ABqPDvwRY1tX28WITB3Nychkg907IwD5qPnTewofxMFqLhx0R4XTL1dAYPFkUECc4FOjslGWvx2z6Y8_aQDIPzerEU-JyANTWwpYPvBtXcAeGcoPGw9fks5t-e14Op3s_AdFs9yc2z9H1y3eJDYmasA9LRzWkThWMyvMcyRVIxN9TfVsaRujn3zQXAETl11R4Ba2uURxxrrOlFSjV26yZmpZWBV05ynFlylEUx6wzEXNljovDqB-6NRGUXVoKmjQFUUlppGxWjDdBq0fpW5aUnb6uCIk5eg55XEI_d-OrR-S5gU1hWg4wngeJ_W5jdw3yu_zRlDOAQeUTwlFJTWxrarcyTAoEIHGLBDwn7pOl5Me2EKZmpdtF04H79jae7jtM4xhTBoBKtOeuHSRBtTicClgDsvcEL9Sey5t-quJl9-fjFq9AoLxgMAXX-7ygbHCLUkLDWhBXPFoSJvtoo2Vx31JTsRhFZTGvVN6ju2gEAhVTp2lrSb3zUq8gaaLUbK6FTIrllm-6pVE&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2Kze_GPIftSqF_8YwUiRW0yKkfee7eWSr1AyK8_QOEFWdelIHAr9qYjq9fN36lmBL4M7Sqe8YbvNGoWSu34pJA9M_ah25lt7aAzSZtm_mbPq5JAjsRRUTRife2ftNoYMNJyo_AkGA%3D&sa=X&ved=2ahUKEwjAsPCv-ZiMAxWJXfEDHVBGEAMQk8gLegQILRAB&ictx=1&stq=1&cs=0#ebo=1';

        $users = User::query()
            ->isActivated()
            ->get();

        $userIds = $users->pluck('id');

        $clients = $userIds ? Client::query()
            ->whereIn('user_id', $userIds)
            ->get()
            ->keyBy('user_id'): null;

        foreach ($users as $user) {
            if ($clients && isset($clients[$user->id]) && $client = $clients[$user->id]) {
                $clientName = $client->full_name;

                Mail::sendTo($user, 'reuniors.reservations::mail.google_review', [
                    'title' => $title,
                    'description' => $description,
                    'link' => $link,
                    'promoCode' => $promoCode,
                    'reservationLink' => 'https://berbernica-tanja.rzr.rs/zakazivanje'
                ]);
                logger()->info("Mail sent to {$user->email} id: {$user->id}, name: {$clientName}");
            }
            break;
        }
    }
}
