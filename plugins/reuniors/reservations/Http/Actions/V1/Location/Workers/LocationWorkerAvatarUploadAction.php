<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\LocationWorker;
use Illuminate\Http\Request;

class LocationWorkerAvatarUploadAction extends BaseAction
{
    public function rules()
    {
        return [
            'file' => ['required', 'file', 'image', 'max:2048'], // Max 2MB
        ];
    }

    public function handle(array $attributes = [], LocationWorker $worker = null)
    {
        // Delete existing avatar if exists
        if ($worker->avatar) {
            $worker->avatar->delete();
        }
        
        // Upload new avatar
        $worker->avatar = request()->file('file');
        $worker->save();
        
        return $worker->fresh(['avatar'])->avatar;
    }

    public function asController(LocationWorker $worker = null): array
    {
        return parent::asController($worker);
    }
}
