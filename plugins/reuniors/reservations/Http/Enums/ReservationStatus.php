<?php

namespace Reuniors\reservations\Http\Enums;

class ReservationStatus
{
    const DRAFT = 0;
    const PENDING = 1;
    const CONFIRMED = 2;
    const CANCELLED = 3;
    const NO_SHOW = 4;
}
