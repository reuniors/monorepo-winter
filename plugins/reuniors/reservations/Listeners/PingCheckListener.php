<?php

namespace Reuniors\Reservations\Listeners;

use Reuniors\Base\Events\PingCheckRequested;
use Reuniors\Reservations\Http\Actions\V1\ReservationsPingAction;
use Reuniors\Reservations\Http\Actions\V1\NotificationsPingAction;

class PingCheckListener
{
    public function handle(PingCheckRequested $event)
    {
        switch ($event->type) {
            case 'reservations':
                $this->handleReservations($event);
                break;
            case 'notifications':
                $this->handleNotifications($event);
                break;
        }
    }

    private function handleReservations(PingCheckRequested $event)
    {
        $action = new ReservationsPingAction();
        $result = $action->handle($event->attributes, $event->lastCheck);

        $event->setResult($result);
    }

    private function handleNotifications(PingCheckRequested $event)
    {
        $action = new NotificationsPingAction();
        $result = $action->handle($event->attributes, $event->lastCheck);

        $event->setResult($result);
    }
}
