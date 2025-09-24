<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location\VideoReview;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\LocationVideoReviewImage;

class FeGetLocationVideoReviewImageAction extends BaseAction
{

    public function rules()
    {
        return [
            'videoReviewId' => 'integer',
        ];
    }

    public function handle(array $attributes = [])
    {
        $videoReviewImage = LocationVideoReviewImage
            ::where('video_review_id', $attributes['videoReviewId'])
            ->firstOrFail();
        $base64Thumbnail = $videoReviewImage->thumbnail_base64;
        $decodedThumbnail = base64_decode($base64Thumbnail);

        return response($decodedThumbnail)
            ->header('Content-Type', 'image/jpeg');
    }

    public function asController()
    {
        return $this->handle(request()->all());
    }
}
