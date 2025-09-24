<?php namespace reuniors\knk\Http\Actions\V1\Location\VideoReview;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;

class GetVideoReviewsAction extends BaseAction
{
    public function rules()
    {
        return [
            'perPage' => 'integer',
        ];
    }

    public function handle(array $attributes = [], Location $location = null)
    {
        return $location
            ->video_reviews()
            ->with('profile')
            ->paginate($attributes['perPage'] ?? 10);
    }

    public function asController(Location $location = null): array
    {
        return parent::asController($location);
    }
}
