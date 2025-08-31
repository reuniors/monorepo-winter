<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Clients\Notifications;

use Lorisleiva\Actions\Concerns\AsAction;
use Auth;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\Notification;

class LocationClientNotifications
{
    use asAction;

    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'perPage' => ['integer'],
        ];
    }

    public function handle(array $attributes)
    {
        $locationSlug = $attributes['locationSlug'];
        $perPage = $attributes['perPage'] ?? 30;
        $user = Auth::getUser();
        $location = Location::where('slug', $locationSlug)
            ->firstOrFail();
        $notificationsQuery = Notification::query();

        $notificationsQuery->whereHas('location', function ($query) use ($location) {
            $query->where('id', $location->id);
        });
        $notificationsQuery->whereHas('users', function ($query) use ($user) {
            $query->where('id', $user->id);
        });

        return $notificationsQuery
            ->select([
                'id',
                'description',
                'created_at',
            ])
            ->with('client_reservations')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function asController()
    {
        $requestData = request()->all();

        return [
            'data' => $this->handle($requestData),
            'success' => true,
        ];
    }
}
