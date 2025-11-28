<?php namespace Reuniors\Calendar\Http\Actions\V1;

use Lorisleiva\Actions\Concerns\AsAction;
use Laravel\Socialite\Facades\Socialite;

class CalendarConnectAction
{
    use AsAction;

    public function rules()
    {
        return [
            'locationId' => 'integer|nullable',
            'locationWorkerId' => 'integer|nullable',
        ];
    }

    public function handle($locationId = null, $locationWorkerId = null)
    {
        if (!$locationId && !$locationWorkerId) {
            throw new \Exception('Either locationId or locationWorkerId must be provided');
        }

        session([
            'calendar_location_id' => $locationId,
            'calendar_location_worker_id' => $locationWorkerId,
        ]);

        return Socialite::driver('google')
            ->scopes([
                'https://www.googleapis.com/auth/calendar',
                'https://www.googleapis.com/auth/calendar.events',
            ])
            ->redirect();
    }

    public function asController()
    {
        $locationId = request()->get('locationId');
        $locationWorkerId = request()->get('locationWorkerId');

        return $this->handle($locationId, $locationWorkerId);
    }
}
