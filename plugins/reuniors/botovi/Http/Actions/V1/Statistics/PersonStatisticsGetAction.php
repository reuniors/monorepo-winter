<?php namespace Reuniors\Botovi\Http\Actions\V1\Statistics;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Person;
use Reuniors\Botovi\Models\PersonStatistics;

class PersonStatisticsGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'personId' => ['required', 'integer', 'exists:reuniors_botovi_people,id'],
            'date_from' => ['nullable', 'date'],
            'date_to' => ['nullable', 'date', 'after:date_from'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $person = Person::findOrFail($attributes['personId']);
        
        $query = PersonStatistics::where('person_id', $person->id);
        
        if (isset($attributes['date_from'])) {
            $query->where('date', '>=', $attributes['date_from']);
        }
        
        if (isset($attributes['date_to'])) {
            $query->where('date', '<=', $attributes['date_to']);
        }
        
        return $query->orderBy('date', 'desc')->get();
    }
}
