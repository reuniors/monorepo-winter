<?php namespace Reuniors\Calendar\Http\Actions\V1;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Calendar\Models\CalendarConnection;

class CalendarConnectionDeleteAction extends BaseAction
{
    public function rules()
    {
        return [
            'connectionId' => 'required|integer|exists:reuniors_calendar_connections,id',
        ];
    }

    public function handle(array $attributes = [])
    {
        $connection = CalendarConnection::findOrFail($attributes['connectionId']);
        
        // TODO: Unregister webhook before deleting
        
        $connection->delete();

        return [
            'success' => true,
            'message' => 'Connection deleted successfully',
        ];
    }
}

