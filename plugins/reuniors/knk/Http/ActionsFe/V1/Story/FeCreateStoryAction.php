<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Story;

use Carbon\Carbon;
use Illuminate\Validation\Rules\File;
use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Story;
use Winter\Storm\Support\Facades\Input;
use Auth;

class FeCreateStoryAction extends BaseAction
{
    public function rules()
    {
        return [
            'file' => [File::image()->max(12 * 1024)],
            'title' => ['string', 'required'],
            'description' => ['string'],
            'url' => ['string'],
            'url_title' => ['string'],
            'type' => ['string', 'in:video_review,location'],
            'location_id' => ['integer'],
            'duration_option' => ['string', 'in:12,24,48'],
            'start_time' => ['date'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $file = Input::hasFile('file') ? Input::file('file') : null;
        $title = $attributes['title'];
        $description = $attributes['description'] ?? null;
        $url = $attributes['url'] ?? null;
        $urlTitle = $attributes['url_title'] ?? null;
        $type = $attributes['type'] ?? null;
        $locationId = $attributes['location_id'] ?? null;
        $durationOption = $attributes['duration_option'] ?? null;
        $startTime = $attributes['start_time'] ?
            Carbon::createFromFormat('Y-m-d H:i:s', $attributes['start_time']) :
            Carbon::now();
        $userData = Auth::getUser() ?? null;

        $newStory = new Story();
        $newStory->title = $title;
        $newStory->description = $description;
        $newStory->url = $url;
        $newStory->url_title = $urlTitle;
        $newStory->location_id = $locationId;
        $newStory->user_id = $userData?->id;
        $newStory->attachment_type = $type;
        $newStory->attachment_id = $locationId;
        $newStory->activation_at = $startTime;
        $newStory->deactivation_at = $startTime->copy()->addHours($durationOption);
        $newStory->save();

        if ($file) {
            $newStory->image()->create([
                'data' => $file
            ]);
        }

        return $newStory;
    }
}
