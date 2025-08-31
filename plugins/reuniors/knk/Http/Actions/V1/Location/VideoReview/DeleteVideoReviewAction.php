<?php

namespace reuniors\knk\Http\Actions\V1\Location\VideoReview;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\LocationVideoReview;

class DeleteVideoReviewAction extends BaseAction
{
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], Location $location = null,  LocationVideoReview $locationVideoReview = null)
    {
        $locationVideoReview->delete();
        return true;
    }

    public function asController(Location $location = null, LocationVideoReview $locationVideoReview = null): array
    {
        return parent::asController($location, $locationVideoReview);
    }
}
