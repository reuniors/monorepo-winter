<?php

namespace Reuniors\Reservations\Listeners;

use Reuniors\Base\Events\PingCheckRequested;
use Reuniors\Reservations\Http\Actions\V1\Ping\ReservationsPingAction;
use Reuniors\Reservations\Http\Actions\V1\Ping\NotificationsPingAction;
use Reuniors\Reservations\Http\Actions\V1\Ping\UsersPingAction;
use Reuniors\Reservations\Http\Actions\V1\Ping\LocationsPingAction;

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
            case 'users':
                $this->handleUsers($event);
                break;
            case 'locations':
                $this->handleLocations($event);
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

    private function handleUsers(PingCheckRequested $event)
    {
        $action = new UsersPingAction();
        $result = $action->handle($event->attributes, $event->lastCheck);

        $event->setResult($result);
    }

    private function handleLocations(PingCheckRequested $event)
    {
        $action = new LocationsPingAction();
        $result = $action->handle($event->attributes, $event->lastCheck);

        $event->setResult($result);
    }
}
