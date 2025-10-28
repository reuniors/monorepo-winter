<?php

namespace Reuniors\Base\Http\Actions\V1;

use Reuniors\Base\Http\Actions\BaseAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;

class PingAction extends BaseAction
{
    public function rules()
    {
        return [
            'lastChecks' => ['nullable', 'array'],
            'types' => ['required', 'array'],
            'hashes' => ['nullable', 'array'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $lastChecks = $attributes['lastChecks'] ?? [];
        $checkTypes = $attributes['types'] ?? ['reservations'];

        $changes = [];
        $newHashes = [];

        foreach ($checkTypes as $type) {
            $lastCheck = $lastChecks[$type] ?? null;
            $result = $this->checkTypeChanges($type, $lastCheck, $attributes);
            $changes[$type] = $result;
            $newHashes[$type] = $result['hash'] ?? null;
        }

        return [
            'hasChanges' => !empty(array_filter($changes, fn($c) => $c['hasChanges'])),
            'changes' => $changes,
            'hashes' => $newHashes,
            'serverTime' => now()->timestamp,
            'nextCheckIn' => 5
        ];
    }

    private function checkTypeChanges(string $type, $lastCheck, array $attributes): array
    {
        // Fire event da plugin-ovi mogu da popune podatke
        $event = new \Reuniors\Base\Events\PingCheckRequested($type, $lastCheck, $attributes);
        Event::dispatch($event);

        return $event->getResult();
    }
}
