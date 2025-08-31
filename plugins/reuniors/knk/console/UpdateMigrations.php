<?php namespace Reuniors\Knk\Console;

use Illuminate\Console\Command;
use RainLab\User\Models\User;
use Reuniors\Knk\Components\LocationComponent;
use Reuniors\Knk\Models\Location;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use DB;

class UpdateMigrations extends Command
{
    /**
     * @var string The console command name.
     */
    protected $name = 'knk:updatemigrations';

    /**
     * @var string The console command description.
     */
    protected $description = 'Actions: latLong | rating | wrongAddress';
    protected $availableActions = ['latLong', 'rating', 'wrongAddress'];

    /**
     * Execute the console command.
     * @return void
     */
    public function handle()
    {
        $db = DB::connection('mysql2');

        $actionName = $this->argument('action');
        if (!in_array($actionName, $this->availableActions)) {
            $this->output->error($actionName . ' is invalid');
            $this->output->error('Valid actions: ' . implode(', ', $this->availableActions));
            return;
        }
        if ($actionName === 'latLong') {
            $this->migrateLatLong($db);
        } elseif ($actionName === 'rating') {
            $this->migrateRatings($db);
        } elseif ($actionName === 'wrongAddress') {
            $this->migrateWrongAddress($db);
        }

        $this->output->writeln('Kraj');
    }

    public function migrateLatLong($db)
    {
        DB::transaction(function () use ($db) {
            $postMetaData = $db->table('wp_postmeta')
                ->select('post_id', 'meta_value')
                ->where('meta_key', 'gm')
                ->get();
            if ($postMetaData) {
                foreach ($postMetaData as $onePostMeta) {
                    $location = Location::where('temp_old_id', $onePostMeta->post_id)->first();
                    if ($location) {
                        $metaValues = unserialize($onePostMeta->meta_value);
                        if ($metaValues['address']) {
                            $addressDataExploded = explode(', ', $metaValues['address']);
                            $addressData = !isset($location->address_data) ? [] : $location->address_data;
                            if (isset($addressDataExploded[0])) {
                                $addressData['street'] = $addressDataExploded[0];
                            }
                            if (isset($addressDataExploded[1])) {
                                $addressData['municipality'] = $addressDataExploded[1];
                            }
                            $location->address_data = $addressData;
                        }
                        if (isset($metaValues['lat'])) {
                            $location->address_lat = $metaValues['lat'];
                        }
                        if (isset($metaValues['lng'])) {
                            $location->address_long = $metaValues['lng'];
                        }
                        $location->save();
                    }
                }
            }
        });
    }

    public function migrateWrongAddress($db)
    {
        DB::transaction(function () use ($db) {
            $matchLatLong =
                "/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)(\s?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/";
            $matchLat =
                "/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)(\s?)$/";
            $matchLong =
                "/^\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/";
            $postMetaData = $db->table('wp_postmeta')
                ->select('post_id', 'meta_value')
                ->where('meta_key', 'adresa')
                ->get();
            $locations = Location
                ::get()
                ->filter(function ($location, $key) use ($matchLatLong) {
                    return is_array($location->address_data)
                        && !empty($location->address_data['street'])
                        && preg_match($matchLatLong, $location->address_data['street']);
                })
                ->keyBy('temp_old_id');
            $locationsOthers = Location
                ::get()
                ->filter(function ($location, $key) use ($matchLat, $matchLong) {
                    return is_array($location->address_data)
                        && !empty($location->address_data['street'])
                        && !empty($location->address_data['municipality'])
                        && preg_match($matchLat, $location->address_data['street'])
                        && preg_match($matchLong, $location->address_data['municipality']);
                })
                ->keyBy('temp_old_id');
            if ($postMetaData) {
                foreach ($postMetaData as $onePostMeta) {
                    $location = $locations[$onePostMeta->post_id] ?? null;
                    if ($location && $location->main_category_id == null) {
                        continue;
                    }
                    if ($location) {
                        $metaValue = $onePostMeta->meta_value;
                        if ($metaValue) {
                            $addressData = !isset($location->address_data) ? [] : $location->address_data;
                            $addressData['street'] = $metaValue;
                            $location->address_data = $addressData;
                        }
                        $location->save();
                    }
                    $location = $locationsOthers[$onePostMeta->post_id] ?? null;
                    if ($location && $location->main_category_id == null) {
                        continue;
                    }
                    if ($location) {
                        $metaValue = $onePostMeta->meta_value;
                        if ($metaValue) {
                            $addressData = !isset($location->address_data) ? [] : $location->address_data;
                            $addressData['street'] = $metaValue;
                            unset($addressData['municipality']);
                            $location->address_data = $addressData;
                        }
                        $location->save();
                    }
                }
            }
        });
    }

    protected $ratingTypesMapper = [
        1 => 'food',
        2 => 'hygiene',
        3 => 'service',
        4 => 'atmosphere',
        5 => 'pricing',
    ];

    /**
     * @param DB $db
     * @throws \Throwable
     */
    public function migrateRatings($db)
    {
        $oldRatings = $db->table('wp_mr_rating_item_entry_value as r_item_val')
            ->select('r_item.ip_address', 'r_item.post_id', 'r_item_val.rating_item_entry_id', 'r_item_val.rating_item_id', '.r_item_val.value')
            ->distinct()
            ->join('wp_mr_rating_item_entry as r_item', 'r_item_val.rating_item_entry_id', '=', 'r_item.rating_item_entry_id')
            ->get();
        $locations = Location::get()->keyBy('temp_old_id');
        $numberOfRatings = count($oldRatings);
        $count = 1;
        $locationComponent = new LocationComponent();
        $usersByIp = [];
        $lastCount = -1;
        foreach ($oldRatings as $oneOldRating) {
            if (isset($locations[$oneOldRating->post_id])) {
                if (!isset($usersByIp[$oneOldRating->ip_address])) {
                    $newUser = new User();
                    $oldUsersCounter = count($usersByIp);
                    $newUser->email = 'korisnik@sastarog.sajta' . $oldUsersCounter;
                    $newUser->name = 'Korisnik sa starog sajta ' . $oldUsersCounter;
                    $newUser->generatePassword();
                    $newUser->save();
                    $usersByIp[$oneOldRating->ip_address] = $newUser;
                } else {
                    $newUser = $usersByIp[$oneOldRating->ip_address];
                }
                $locationComponent->setRating($locations[$oneOldRating->post_id]['id'], $this->ratingTypesMapper[$oneOldRating->rating_item_id], (double)$oneOldRating->value + 5, $newUser->id);
            }
            if ($lastCount != round($count++ / ($numberOfRatings / 100))) {
                $lastCount = round($count - 1 / ($numberOfRatings / 100));
                $this->output->writeln($lastCount);
            }
        }
    }

    /**
     * Get the console command arguments.
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['action', InputArgument::REQUIRED, 'Action name is required'],
        ];
    }

    /**
     * Get the console command options.
     * @return array
     */
    protected function getOptions()
    {
        return [];
    }
}
