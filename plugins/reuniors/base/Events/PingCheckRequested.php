<?php

namespace Reuniors\Base\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PingCheckRequested
{
    use Dispatchable, SerializesModels;

    public string $type;
    public $lastCheck;
    public array $attributes;
    public array $result = [
        'hasChanges' => false,
        'hash' => null,
        'count' => 0,
        'lastUpdated' => null
    ];

    public function __construct(string $type, $lastCheck, array $attributes)
    {
        $this->type = $type;
        $this->lastCheck = $lastCheck;
        $this->attributes = $attributes;
    }

    public function setResult(array $result): void
    {
        $this->result = array_merge($this->result, $result);
    }

    public function getResult(): array
    {
        return $this->result;
    }
}
