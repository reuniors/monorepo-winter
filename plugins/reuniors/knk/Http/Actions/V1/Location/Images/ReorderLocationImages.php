<?php namespace reuniors\knk\Http\Actions\V1\Location\Images;

use Auth;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Questionnaire\Classes\Helpers\ReorderDataHelper;
use Reuniors\Questionnaire\Models\QuestionnaireRegistrationData;

class ReorderLocationImages extends BaseAction {
    public function rules()
    {
        return [
            'reorderData' => ['required', 'array'],
            'imageType' => ['required', 'in:gallery,menu_gallery'],
        ];
    }

    public function handle(array $attributes = [], Location $location = null)
    {
        $reorderData = $attributes['reorderData'];
        $imageType = $attributes['imageType'];


        ReorderDataHelper::reorderModelData(
            $location->{$imageType}()->getQuery(),
            $reorderData
        );
        
        return [
            'type' => $imageType,
            'images' => $location->{$imageType}()->get(),
        ];
    }

    public function asController(Location $location = null): array
    {
        return parent::asController($location);
    }
}
