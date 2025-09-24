<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Services\Service;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Service;
use Illuminate\Support\Facades\Log;

class ServiceDeleteAction extends BaseAction
{
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