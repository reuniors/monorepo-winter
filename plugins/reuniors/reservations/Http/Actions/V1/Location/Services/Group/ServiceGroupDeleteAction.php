<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Services\Group;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\ServiceGroup;
use Illuminate\Support\Facades\Log;

class ServiceGroupDeleteAction extends BaseAction
{
    use AsAction;

    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], ServiceGroup $serviceGroup = null)
    {
        $serviceGroup->services()->delete();
        $serviceGroup->locations()->detach();
        $serviceGroup->delete();
        return true;
    }

    public function asController(ServiceGroup $serviceGroup = null): array
    {
        return parent::asController($serviceGroup);
    }
} 