<?php namespace Reuniors\Knk\Console\Fragments;

use Reuniors\Knk\Http\Actions\V1\Image\ImageToWebpAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\WorkingTime;

class FixLocationsData
{
    protected static $dayMapper = [
        'mon' => 'monday',
        'tue' => 'tuesday',
        'wed' => 'wednesday',
        'thu' => 'thursday',
        'fri' => 'friday',
        'sat' => 'saturday',
        'sun' => 'sunday',
    ];

    protected static $dayLabelMapper = [
        'monday' => 'Pon',
        'tuesday' => 'Uto',
        'wednesday' => 'Sre',
        'thursday' => 'Čet',
        'friday' => 'Pet',
        'saturday' => 'Sub',
        'sunday' => 'Ned',
    ];

    public static function fixLocationWorkingTimeAndPhoneData($output)
    {
        $locations = Location::with(['working_time', 'delivery_working_time'])
            ->get();

        /** @var Location $location */
        foreach ($locations as $location) {
            $phoneData = $location->phone_data;
            $workingHoursData = $location->working_hours_data;
            $deliveryWorkingHoursData = $location->delivery_working_hours_data;

            if (!empty($phoneData)) {
                $phoneNumbers = [];
                $deliveryPhoneNumbers = [];

                if (!empty($phoneData['phone_1'])) {
                    $phoneNumbers[] = $phoneData['phone_1'];
                }
                if (!empty($phoneData['phone_2'])) {
                    $phoneNumbers[] = $phoneData['phone_2'];
                }
                if (!empty($phoneData['mobile_1'])) {
                    $phoneNumbers[] = $phoneData['mobile_1'];
                }
                if (!empty($phoneData['mobile_2'])) {
                    $phoneNumbers[] = $phoneData['mobile_2'];
                }
                if (!empty($phoneData['delivery_1'])) {
                    $deliveryPhoneNumbers[] = $phoneData['delivery_1'];
                }
                if (!empty($phoneData['delivery_2'])) {
                    $deliveryPhoneNumbers[] = $phoneData['delivery_2'];
                }


                $phoneData['phone_numbers'] = $phoneNumbers;
                $phoneData['delivery_phone_numbers'] = $deliveryPhoneNumbers;

                $location->phone_data = $phoneData;
            }
            $location->forceSave();

            $fixWorkingHoursData = function ($workingHoursData) {
                if (!empty($workingHoursData)) {
                    $workingHoursDataFixed = [];
                    $fromDay = $workingHoursData['from_day'];
                    $toDay = $workingHoursData['to_day'];
                    $mondayFriday = $workingHoursData['monday_friday'];
                    $saturday = $workingHoursData['saturday'];
                    $sunday = $workingHoursData['sunday'];
                    $monday = $workingHoursData['monday'];
                    $tuesday = $workingHoursData['tuesday'];
                    $wednesday = $workingHoursData['wednesday'];
                    $thursday = $workingHoursData['thursday'];
                    $friday = $workingHoursData['friday'];

                    $daysCodes = WorkingTime::DATES_CODES;
                    $daysCodesValues = array_values($daysCodes);
                    $daysCodesIndexes = array_flip($daysCodesValues);
                    $dayMapper = array_flip(self::$dayMapper);

                    if (
                        !empty($mondayFriday['start']) &&
                        !empty($mondayFriday['end']) &&
                        !empty($fromDay) &&
                        !empty($toDay)
                    ) {
                        $fromIndex = $daysCodesIndexes[$dayMapper[$fromDay]];
                        $toIndex = $daysCodesIndexes[$dayMapper[$toDay]];
                        $fromDayLabel = self::$dayLabelMapper[$fromDay];
                        $toDayLabel = self::$dayLabelMapper[$toDay];

                        $workingHoursDataFixed[] = [
                            'name' => "$fromDayLabel - $toDayLabel",
                            'days_codes' => array_slice($daysCodesValues, $fromIndex, $toIndex + 1),
                            'time_from' => $mondayFriday['start'],
                            'time_to' => $mondayFriday['end'],
                        ];
                    }

                    $addWorkingHoursData = function ($day, $dayName) use (&$workingHoursDataFixed) {
                        $dayNameLabel = self::$dayLabelMapper[self::$dayMapper[$dayName]];
                        if (
                            !empty($day['start']) &&
                            !empty($day['end'])
                        ) {
                            $workingHoursDataFixed[] = [
                                'name' => $dayNameLabel,
                                'days_codes' => [$dayName],
                                'time_from' => $day['start'],
                                'time_to' => $day['end'],
                            ];
                        }
                    };

                    $addWorkingHoursData($saturday, 'sat');
                    $addWorkingHoursData($sunday, 'sun');
                    $addWorkingHoursData($monday, 'mon');
                    $addWorkingHoursData($tuesday, 'tue');
                    $addWorkingHoursData($wednesday, 'wed');
                    $addWorkingHoursData($thursday, 'thu');
                    $addWorkingHoursData($friday, 'fri');
                }
                return $workingHoursDataFixed ?? [];
            };

            $workingHoursDataFixed = $fixWorkingHoursData($workingHoursData);
            $deliveryWorkingHoursDataFixed = $fixWorkingHoursData($deliveryWorkingHoursData);

            if (!empty($workingHoursDataFixed)) {
                $location->syncWorkingHours($workingHoursDataFixed, 'working_time');
            }
            if (!empty($deliveryWorkingHoursDataFixed)) {
                $location->syncWorkingHours($deliveryWorkingHoursDataFixed, 'delivery_working_time');
            }
            $output->writeln($location->title);
        }
    }

    public static function allLocationsImagesToWebp($output = null)
    {
        $imageToWebp = new ImageToWebpAction();
        Location::with(['gallery', 'cover_image', 'logo'])
            ->where(function ($query) {
                $query->whereHas('gallery', function ($query) {
                    $query->whereNot('content_type', 'image/webp');
                })->orWhereHas('cover_image', function ($query) {
                    $query->whereNot('content_type', 'image/webp');
                })->orWhereHas('logo', function ($query) {
                    $query->whereNot('content_type', 'image/webp');
                });
            })
            ->chunk(50, function ($locations) use (
                $imageToWebp, $output
            ) {
                foreach ($locations as $location) {
                    $gallery = $location->gallery;
                    $coverImage = $location->cover_image;
                    $logo = $location->logo;

                    if (!empty($gallery)) {
                        foreach ($gallery as $image) {
                            if ($image->content_type !== 'image/webp') {
                                $imageToWebp->handle($image, $output);
                            }
                        }
                    }

                    if (!empty($coverImage) && $coverImage->content_type !== 'image/webp') {
                        $imageToWebp->handle($coverImage, $output);
                    }

                    if (!empty($logo) && $logo->content_type !== 'image/webp') {
                        $imageToWebp->handle($logo, $output);
                    }

                    $output && $output->writeln($location->title);
                }
            });
    }
}
