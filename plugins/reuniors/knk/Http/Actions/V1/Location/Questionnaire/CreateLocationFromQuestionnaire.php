<?php namespace reuniors\knk\Http\Actions\V1\Location\Questionnaire;

use Exception;
use Illuminate\Support\Facades\DB;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Classes\S;
use Reuniors\Knk\Models\Location;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Auth;

class CreateLocationFromQuestionnaire extends BaseAction {
    public function rules()
    {
        return [
            'code' => 'required',
            'id' => 'required',
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        $code = $attributes['code'];
        $id = $attributes['id'];

        $questionnaire = QuestionnaireRegistration::where('code', $code)
            ->withCount('registration_data')
            ->firstOrFail();

        $questionnaireData = $questionnaire
            ->registration_data()
            ->where('id', $id)
            ->where('type', 'location')
            ->with([
                'questionnaire_data_images',
                'gallery_images',
                'cover_image',
                'logo'
            ])
            ->firstOrFail();
        $data = $questionnaireData->data;

        if (!isset(
            $data['name'], $data['cityId'], $data['addressData'], $data['workingHours'], $data['categories'],
            $questionnaireData->questionnaire_data_images, $questionnaireData->gallery_images, $questionnaireData->cover_image
        )) {
            throw new Exception('Missing required data to create location');
        }
        $location = null;

        DB::transaction(function () use ($data,  $user, $questionnaireData, &$location) {
            $populateWorkingHours = function ($workingHours) {
                $returnData = [];
                foreach ($workingHours as $workingTime) {
                    $returnData[] = [
                        'time_from_utc' => $workingTime['timeFrom'],
                        'time_to_utc' => $workingTime['timeTo'],
                        'days_codes' => $workingTime['daysCodes'],
                        'name' => $workingTime['name'],
                        'active' => $workingTime['active'] ?? true,
                    ];
                }
                return $returnData;
            };

            $title = $data['name'];
            $categories = $data['categories'];
            $restaurantMenuIds = $data['restaurant_menu_ids'] ?? [];
            $workingHours = $data['workingHours']
                ? $populateWorkingHours($data['workingHours'])
                : [];
            $deliveryWorkingHours = $data['deliveryWorkingHours']
                ? $populateWorkingHours($data['deliveryWorkingHours'])
                : [];
            $galleryImages = $questionnaireData->gallery_images;
            $coverImage = $questionnaireData->cover_image;
            $logoImage = $questionnaireData->logo;
            $menuGalleryImages = $questionnaireData->questionnaire_data_images;

            $location = Location::create([
                'title' => $title,
                'name' => S::camel($title),
                'slug' => S::slug($title),
                'text' => $data['description'] ?? null,
                'metadata' => $data['metadata'] ?? [],
                'snippet' => substr($data['description'], 0, 120),
                'city_id' => $data['cityId'],
                'is_child' => $data['isChild'] ?? 0,
                'parent_id' => $data['parentId'] ?? null,
                'address_data' => [
                    'google_url' => $data['addressData']['googleUrl'] ?? null,
                    'street' => $data['addressData']['street'] ?? null,
                    'street_number' => $data['addressData']['streetNumber'] ?? null,
                    'zip' => $data['addressData']['zipCode'] ?? null,
                    'municipality' => $data['addressData']['municipality'] ?? null,
                ],
                'phone_data' => [
                    'phone_numbers' => $data['phoneData']['phoneNumbers'] ?? [],
                    'delivery_phone_numbers' => $data['phoneData']['deliveryPhoneNumbers'] ?? [],
                    'delivery_show_number' => $data['phoneData']['showDeliveryPhoneNumbers'] ?? false,
                    'phone_1' => $data['phoneData']['phoneNumbers'][0] ?? '',
                    'phone_2' => $data['phoneData']['phoneNumbers'][1] ?? '',
                    'mobile_1' => $data['phoneData']['phoneNumbers'][2] ?? '',
                    'mobile_2' => $data['phoneData']['phoneNumbers'][3] ?? '',
                    'delivery_1' => $data['phoneData']['deliveryPhoneNumbers'][0] ?? '',
                    'delivery_2' => $data['phoneData']['deliveryPhoneNumbers'][1] ?? '',
                ],
                'other_info' => $data['otherInfo'] ?? [],
                'show_on_home' => $data['showOnHome'] ?? false,
                'show_on_home_global' => $data['showOnHomeGlobal'] ?? false,
                'has_delivery' => $data['hasDelivery'] ?? false,
                'has_online_delivery' => $data['hasOnlineDelivery'] ?? false,
                'average_price' => $data['averagePrice'] ?? null,
                'average_price_for_two' => $data['averagePriceForTwo'] ?? null,
                'delivery_url_path' => $data['deliveryUrlPath'] ?? null,
                'badge_tag_group_id' => $data['badgeTagGroupId'] ?? null,
                'address_lat' => $data['coordinates']['lat'],
                'address_long' => $data['coordinates']['lng'],
                'closed_from_at' => $data['closed_from_at'] ?? null,
                'closed_to_at' => $data['closed_to_at'] ?? null,
                'is_closed' => $data['is_closed'] ?? false,
                'main_category_id' => $data['mainCategoryId'],
                'user_id' => $data['user_id'] ?? $user->id,
            ]);

            foreach ($categories as $categoryId) {
                $location->categories()->attach($categoryId);
            }

            foreach ($restaurantMenuIds as $restaurantMenuId) {
                $location->restaurant_menu()->attach($restaurantMenuId);
            }

            foreach ($galleryImages as $index => $galleryImage) {
                $galleryImage->update([
                    'file_name' => $location->name . '-' . $index,
                    'field' => 'gallery',
                    'attachment_type' => Location::class,
                    'attachment_id' => $location->id,
                ]);
            }

            foreach ($menuGalleryImages as $index => $menuGalleryImage) {
                $menuGalleryImage->update([
                    'file_name' => $location->name . '-' . $index,
                    'field' => 'menu_gallery',
                    'attachment_type' => Location::class,
                    'attachment_id' => $location->id,
                ]);
            }

            $coverImage->update([
                'file_name' => $location->name . '-cover',
                'field' => 'cover_image',
                'attachment_type' => Location::class,
                'attachment_id' => $location->id,
            ]);

            if ($logoImage) {
                $logoImage->update([
                    'file_name' => $location->name . '-logo',
                    'field' => 'logo',
                    'attachment_type' => Location::class,
                    'attachment_id' => $location->id,
                ]);
            }

            $location->syncWorkingHours($workingHours, 'working_time');

            if (!empty($deliveryWorkingHours)) {
                $location->syncWorkingHours($deliveryWorkingHours, 'delivery_working_time');
            }

            $location->save();

            $questionnaireData->delete();
        });

        return $location;
    }
}
