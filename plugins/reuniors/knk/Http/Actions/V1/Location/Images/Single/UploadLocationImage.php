<?php namespace reuniors\knk\Http\Actions\V1\Location\Images\Single;

use InvalidArgumentException;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Questionnaire\Classes\Helpers\ReorderDataHelper;
use Reuniors\Questionnaire\Models\QuestionnaireRegistrationData;
use Winter\Storm\Support\Facades\Input;

class UploadLocationImage extends BaseAction
{
    public function rules()
    {
        return [
            'file' => 'required',
            'imageType' => ['required', 'in:cover_image,logo'],
        ];
    }

    public function handle(array $attributes = [], Location $location = null)
    {
        $imageType = $attributes['imageType'];

        if (!Input::hasFile('file')) {
            throw new InvalidArgumentException('File is required');
        }

        DeleteLocationImage::run(['imageType' => $imageType], $location);

        $imageData = $location
            ->{$imageType}()
            ->create(['data' => Input::file('file')]);

        return $imageData;
    }

    public function asController(Location $location = null): array
    {
        return parent::asController($location);
    }
}
