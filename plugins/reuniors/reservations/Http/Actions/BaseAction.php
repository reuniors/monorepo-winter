<?php namespace Reuniors\reservations\Http\Actions;

use Lorisleiva\Actions\Concerns\AsAction;

abstract class BaseAction
{
    use AsAction;

    public abstract function handle(array $attributes = []);

    public function asController(): array
    {
        $args = func_get_args();
        return [
            'data' => $this->handle(request()->all(), ...$args),
            'success' => true,
        ];
    }
}
