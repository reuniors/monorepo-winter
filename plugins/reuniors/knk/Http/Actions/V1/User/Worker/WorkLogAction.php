<?php namespace Reuniors\Knk\Http\Actions\V1\User\Worker;

use Auth;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\UserWorkingTimeHistory;

class WorkLogAction extends BaseAction {
    public function rules()
    {
        return [];
    }

    public function handle($attributes = [])
    {
        $user = Auth::getUser();
        $workingTimeHistory = $user
            ->working_time_history()
            ->today()
            ->first();

        if (!$workingTimeHistory) {
            $workingTimeHistory = new UserWorkingTimeHistory();
            $workingTimeHistory->user = $user;
        }

        $workingTimeHistory->logWork();


        return [
            'success' => true,
            'data' => [
                'duration' => $workingTimeHistory->duration_in_sec
            ],
        ];
    }

    public function asController()
    {
        $requestData = request()->all();
        return $this->handle($requestData);
    }
}
