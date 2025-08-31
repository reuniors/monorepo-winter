<?php namespace reuniors\wintersocialite\Http\Actions\User;

use Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class CompleteUserRegistration
{
    use asAction;

    public function rules()
    {
        return [
            'name' => ['required', 'string'],
            'phone' => ['required', 'string'],
        ];
    }

    public function handle(array $data = [])
    {
        $user = Auth::user();

        $user->update([
            'name' => $data['name'],
            'phone' => $data['phone'],
            'is_activated' => true,
        ]);

        return $user;
    }

    public function asController()
    {
        $requestData = request()->all();
        $this->handle($requestData);

        return [
            'success' => true,
            'data' => null
        ];
    }
}
