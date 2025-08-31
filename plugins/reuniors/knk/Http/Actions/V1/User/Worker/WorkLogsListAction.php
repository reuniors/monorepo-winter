<?php namespace Reuniors\Knk\Http\Actions\V1\User\Worker;

use Lorisleiva\Actions\Concerns\AsAction;
use Auth;
use Reuniors\Knk\Models\UserWorkingTimeHistory;

class WorkLogsListAction
{
    use asAction;

    public function rules()
    {
        return [
            'by' => ['string', 'in:month,day', 'required'],
            'month' => 'date_format:Y-m',
            'userId' => 'numeric',
        ];
    }

    public function handle($attributes = [])
    {
        $by = $attributes['by'];
        $userId = $attributes['userId'] ?? null;
        $month = $attributes['month'] ?? null;

        $currentUser = Auth::getUser();
        $userGroups = $currentUser->groups->pluck('code')->toArray();
        $isWorker = in_array('worker', $userGroups);

        $workTimeHistoryQuery = UserWorkingTimeHistory::query();

        if ($isWorker) {
            $workTimeHistoryQuery
                ->where('user_id', $currentUser->id);
        } else if ($userId) {
            $workTimeHistoryQuery
                ->where('user_id', $userId);
        }

        if ($month) {
            $workTimeHistoryQuery
                ->where('date', 'like', $month . '%');
        }

        return [
            'success' => true,
            'data' => $workTimeHistoryQuery
                ->by($by)
                ->paginate(31),
        ];
    }

    public function asController()
    {
        $requestData = request()->all();
        return $this->handle($requestData);
    }
}
