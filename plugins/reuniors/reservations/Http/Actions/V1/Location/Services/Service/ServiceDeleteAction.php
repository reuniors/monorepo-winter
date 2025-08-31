<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Services\Service;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Service;
use Illuminate\Support\Facades\Log;

class ServiceDeleteAction extends BaseAction
{
    use AsAction;

    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], Service $service = null)
    {
        $service->delete();
        return true;
    }

    public function asController(Service $service = null): array
    {
        return parent::asController($service);
    }
} 