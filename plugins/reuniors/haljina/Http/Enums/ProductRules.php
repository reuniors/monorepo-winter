<?php

namespace Reuniors\Haljina\Http\Enums;

class ProductRules
{
    public int $dailyLimit;
    public int $monthlyLimit;
    public int $activeLimit;

    public function __construct()
    {
        $this->dailyLimit = 3;
        $this->monthlyLimit = 10;
        $this->activeLimit = 10;
    }
}
