<?php namespace Reuniors\Knk\Console\Fragments;

use Reuniors\Knk\Http\Actions\V1\Image\ImageToWebpAction;
use Reuniors\Knk\Models\Food;

class FixFoodData
{
    public static function allFoodsImagesToWebp($output = null)
    {
        $imageToWebp = new ImageToWebpAction();
        Food::with(['food_image'])
            ->whereHas('food_image', function ($query) {
                $query->whereNot('content_type', 'image/webp');
            })
            ->chunk(50, function ($foods) use ($imageToWebp, $output) {
                foreach ($foods as $food) {
                    $output && $output->writeln('before:' . $food->title);

                    if (!empty($food->food_image)) {
                        $imageToWebp->handle($food->food_image, $output);
                    }

                    $output && $output->writeln('after:' . $food->title);
                }
            });
    }
}
