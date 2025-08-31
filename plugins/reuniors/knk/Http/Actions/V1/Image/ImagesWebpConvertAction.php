<?php namespace Reuniors\Knk\Http\Actions\V1\Image;

use Illuminate\Support\Facades\Log;
use Reuniors\Knk\Console\Fragments\FixFoodData;
use Reuniors\Knk\Console\Fragments\FixLocationsData;

class ImagesWebpConvertAction
{
    public function handle()
    {
        Log::info('ImagesWebpConvertAction started');
        FixLocationsData::allLocationsImagesToWebp();
        FixFoodData::allFoodsImagesToWebp();
    }
}
