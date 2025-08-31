<?php namespace Reuniors\Reservations\Http\Actions\V1\Notification;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\reservations\Http\Enums\NotificationStatus;
use Reuniors\Reservations\Models\Notification;
use Auth;

class NotificationUpdateAction
{
    use asAction;

    public function rules()
    {
        return [
            'notificationId' => ['required', 'integer'],
            'status' => ['required', 'string']
        ];
    }

    public function handle(array $attributes)
    {
        $user = Auth::getUser();
        $notificationId = $attributes['notificationId'];
        $usersIds = [$user->id];
        $status = $attributes['status'];

        $notification = Notification::where('id', $notificationId)
            ->whereHas('users', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->firstOrFail();

        $notification->users()->syncWithoutDetaching($usersIds, ['status' => $status]);

        return true;
    }

    public function asController()
    {
        $requestData = request()->all();
        return [
            'success' => true,
            'data' => $this->handle($requestData)
        ];
    }
}
