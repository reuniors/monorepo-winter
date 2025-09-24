<?php namespace Reuniors\Knk\Http\Actions\V1\Location\Tags;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;

class GetLocationTags extends BaseAction
{
    public function rules()
    {
        return [
            'perPage' => ['integer'],
        ];
    }

    public function handle(array $attributes = [], Location $location = null)
    {
        $perPage = $attributes['perPage'] ?? 20;

        return $location->tags()->paginate($perPage);
    }

    public function asController(Location $location = null): array
    {
        return parent::asController($location);
    }
}
