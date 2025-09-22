<?php namespace Reuniors\Knk\Classes;

use Carbon\Carbon;
use Reuniors\Knk\Models\Location;
use Reuniors\Base\Models\City;
use Vdlp\Sitemap\Classes\Contracts\DefinitionGenerator;
use Vdlp\Sitemap\Classes\Dto\Definition;
use Vdlp\Sitemap\Classes\Dto\Definitions;

final class SitemapDefinition implements DefinitionGenerator
{
    public function getDefinitions(): Definitions
    {
        $definitions = new Definitions();

        $siteUrl = url('/');
        $cities = City::where('active', 1)
            ->with('locations')
            ->with('locations.main_category')
            ->with('parent_city')
            ->get();
        $definitions->addItem(
            (new Definition)->setModifiedAt(Carbon::yesterday()->subDay())
                ->setPriority(1)
                ->setUrl("$siteUrl")
                ->setChangeFrequency(Definition::CHANGE_FREQUENCY_MONTHLY)
        );
        $definitions->addItem(
            (new Definition)->setModifiedAt(Carbon::yesterday())
                ->setPriority(1)
                ->setUrl("$siteUrl" . "nis/restorani-studenti")
                ->setChangeFrequency(Definition::CHANGE_FREQUENCY_MONTHLY)
        );
        $definitions->addItem(
            (new Definition)->setModifiedAt(Carbon::yesterday())
                ->setPriority(1)
                ->setUrl("$siteUrl" . "nis/kafici-studenti")
                ->setChangeFrequency(Definition::CHANGE_FREQUENCY_MONTHLY)
        );
        $tabs = Location::$tabs;
        unset($tabs['info']);
        foreach ($cities as $city) {
            $cityCategories = [];
            $citySlugMain = $city->slug;
            $citySlug = $city->parent_city
                ? $city->parent_city->slug . '/' . $city->slug
                : $city->slug;
            $definitions->addItem(
                (new Definition)
                    ->setModifiedAt($city->updated_at)
                    ->setPriority(1)
                    ->setUrl("$siteUrl$citySlugMain")
                    ->setChangeFrequency(Definition::CHANGE_FREQUENCY_MONTHLY)
            );
            $definitions->addItem(
                (new Definition)
                    ->setModifiedAt($city->updated_at)
                    ->setPriority(1)
                    ->setUrl("$siteUrl$citySlugMain/gde-jesti")
                    ->setChangeFrequency(Definition::CHANGE_FREQUENCY_MONTHLY)
            );
            foreach ($city->locations as $location) {
                if (!$location->main_category) {
                    continue;
                }
                $mainCategory = $location->main_category;
                if (!isset($cityCategories[$mainCategory->id])) {
                    $cityCategories[$mainCategory->id] = [
                        'categoryDefinition' => (new Definition)
                            ->setModifiedAt($mainCategory->updated_at)
                            ->setPriority(1)
                            ->setUrl("$siteUrl$citySlugMain/$mainCategory->slug")
                            ->setChangeFrequency(Definition::CHANGE_FREQUENCY_DAILY),
                        'locations' => []
                    ];
                }
                $cityCategories[$mainCategory->id]['locations'][] = (new Definition)
                    ->setModifiedAt($location->updated_at)
                    ->setPriority(1)
                    ->setUrl("$siteUrl$citySlug/$mainCategory->slug/$location->slug")
                    ->setChangeFrequency(Definition::CHANGE_FREQUENCY_MONTHLY);
                foreach ($tabs as $tab => $tabEn) {
                    $cityCategories[$mainCategory->id]['locations'][] = (new Definition)
                        ->setModifiedAt($location->updated_at)
                        ->setPriority(1)
                        ->setUrl("$siteUrl$citySlug/$mainCategory->slug/$location->slug/$tab")
                        ->setChangeFrequency(Definition::CHANGE_FREQUENCY_MONTHLY);
                }
            }
            foreach ($cityCategories as $cityCategory) {
                $definitions->addItem(
                    $cityCategory['categoryDefinition']
                );
                foreach ($cityCategory['locations'] as $locationDefinition) {
                    $definitions->addItem($locationDefinition);
                }
            }
        }

        return $definitions;
    }
}
