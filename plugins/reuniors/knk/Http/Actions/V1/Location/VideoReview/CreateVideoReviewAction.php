<?php namespace reuniors\knk\Http\Actions\V1\Location\VideoReview;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\LocationVideoReview;
use Reuniors\Knk\Models\LocationVideoReviewProfile;
use System\Models\File;

class CreateVideoReviewAction extends BaseAction
{
    public function rules()
    {
        return [
            'source' => 'required',
            'source_url' => ['string', 'required'],
            'source_body' => 'string',
            'thumbnail_url' => 'string',
            'thumbnail_width' => 'integer',
            'thumbnail_height' => 'integer',
            'source_eid' => 'string',

            'username' => ['string', 'required'],
            'author_url' => 'string',
            'author_name' => 'string',
            'author_photo' => 'string',
        ];
    }

    public function handle(array $attributes = [], Location $location = null)
    {
        $profile_picture_url = $attributes['author_photo'] ?? $attributes['thumbnail_url'] ?? null;

        $videoReviewProfile = LocationVideoReviewProfile
            ::where('username', $attributes['username'])
            ->where('source', $attributes['source'])
            ->first();

        if (!$videoReviewProfile) {
            $videoReviewProfile = LocationVideoReviewProfile::create([
                'username' => $attributes['username'],
                'source' => $attributes['source'],
                'author_name' => $attributes['author_name'] ?? null,
                'author_url' => $attributes['author_url'] ?? null,
                'author_photo' => $attributes['author_photo'] ?? null,
            ]);
        }

        $videoReviewProfile->load('video_author_photo');

        if (!$videoReviewProfile->video_author_photo && $profile_picture_url) {
            // Create download file from url
            $file = (new File)->fromUrl($profile_picture_url);
            $file->save();

            $thumbPath = $file->getThumb(150, 150, ['mode' => 'crop']);
            $thumb = (new File)->fromUrl($thumbPath);
            $videoReviewProfile->video_author_photo()->add($thumb);

            $file->delete();
        }

        LocationVideoReview::create([
            'location_id' => $location->id,
            'profile_id' => $videoReviewProfile->id,
            'source' => $attributes['source'],
            'source_url' => $attributes['source_url'],
            'source_body' => $attributes['source_body'] ?? null,
            'thumbnail_url' => $attributes['thumbnail_url'] ?? null,
            'thumbnail_width' => $attributes['thumbnail_width'] ?? null,
            'thumbnail_height' => $attributes['thumbnail_height'] ?? null,
            'source_eid' => $attributes['source_eid'] ?? null,
        ]);
    }

    public function asController(Location $location = null): array
    {
        return parent::asController($location);
    }
}
