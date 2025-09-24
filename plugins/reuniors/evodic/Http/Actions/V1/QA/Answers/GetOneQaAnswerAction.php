<?php namespace Reuniors\Evodic\Http\Actions\V1\QA\Answers;

use http\Exception\InvalidArgumentException;
use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Location;
use Reuniors\Evodic\Models\QaAnswer;

class GetOneQaAnswerAction extends BaseAction
{

    public function rules()
    {
        return [];
    }

    public function handle(Location $location, QaAnswer $qaAnswer)
    {
        if ($location->id !== $qaAnswer->location_id) {
            throw new InvalidArgumentException('Location and QaAnswer do not match');
        }
        return [
            'success' => true,
            'data' => $qaAnswer
                ->load('qaQuestion')
        ];
    }

    public function asController(Request $request, Location $location, QaAnswer $qaAnswer)
    {
        return $this->handle($location, $qaAnswer);
    }
}
