<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\LocationWorker;

class LocationWorkerAvatarDeleteAction extends BaseAction
{
    public function rules()
    {
        return [
            // No validation needed - workerId comes from route
        ];
    }

    public function handle(array $attributes = [], LocationWorker $worker = null)
    {
        // Delete avatar if exists
        if ($worker->avatar) {
            $worker->avatar->delete();
        }
        
        return ['success' => true];
    }

    public function asController(LocationWorker $worker = null): array
    {
        return parent::asController($worker);
    }
}
