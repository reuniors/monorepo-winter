<?php namespace Reuniors\UserExtended\Http\Actions\User\Addresses;

use Auth;
use Lorisleiva\Actions\Concerns\AsAction;
use Nette\ArgumentOutOfRangeException;
use Reuniors\UserExtended\Models\UserAddress;

class UserAddressCreateNewAction
{
    use AsAction;

    const LIMIT = 10;

    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.city_id' => ['required', 'integer'],
            'data.street' => ['required', 'string'],
            'data.street_number' => ['required', 'string'],
            'data.floor' => ['nullable', 'string'],
            'data.apartment' => ['nullable', 'string'],
            'data.lat' => ['required', 'numeric'],
            'data.long' => ['required', 'numeric'],
            'data.notice' => ['nullable', 'string'],
            'data.name' => ['nullable', 'string'],
        ];
    }

    public function handle(array $attributes)
    {
        $user = Auth::getUser();
        $data = $attributes['data'];

        if (UserAddress::where('user_id', $user->id)->count() >= static::LIMIT) {
            throw new ArgumentOutOfRangeException('You have reached the limit of addresses', 400);
        }

        return UserAddress::create([
            'user_id' => $user->id,
            ...$data,
            'name' => $data['name'] ?? "{$data['street']} {$data['street_number']}",
        ]);
    }

    public function asController()
    {
        return [
            'success' => true,
            'data' => $this->handle(request()->all()),
        ];
    }
}
