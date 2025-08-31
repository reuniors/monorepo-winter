<?php namespace Reuniors\Evodic\Http\Actions;

use Lorisleiva\Actions\Concerns\AsAction;

abstract class BaseAction
{
    use AsAction;

    public abstract function handle(array $attributes = []);

    public function asController(...$args): array
    {
        return [
            'data' => $this->handle(request()->all(), ...$args),
            'success' => true,
        ];
    }
}
