<?php
namespace Reuniors\reservations\Http\Actions\V1\User\Client;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Client;

class WorkerClientDataGetOneAction extends BaseAction
{
    use asAction;

    public function rules()
    {
        return [
            'clientId' => ['required', 'integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $clientId = $attributes['clientId'];

        $client = Client::query()
            ->with('user', function ($query) {
                $query->select('id', 'email');
            })
            ->find($clientId);

        return $client;
    }
}
