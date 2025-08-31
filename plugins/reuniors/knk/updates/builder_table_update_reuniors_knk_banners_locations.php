<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkBannersLocations extends Migration
{
    public function up()
    {
        Schema::rename('reuniors_knk_banner_zones_locations', 'reuniors_knk_banners_locations');
        Schema::table('reuniors_knk_banners_locations', function($table)
        {
            $table->dropPrimary(['banner_zone_id','location_id']);
            $table->renameColumn('banner_zone_id', 'banner_id');
            $table->primary(['banner_id','location_id'], 'reuniors_bnnr_location');
        });
    }

    public function down()
    {
        Schema::rename('reuniors_knk_banners_locations', 'reuniors_knk_banner_zones_locations');
        Schema::table('reuniors_knk_banner_zones_locations', function($table)
        {
            $table->dropPrimary(['banner_id','location_id']);
            $table->renameColumn('banner_id', 'banner_zone_id');
            $table->primary(['banner_zone_id','location_id']);
        });
    }
}
