<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkBannerZonesLocations extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_banner_zones_locations', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('banner_zone_id')->unsigned();
            $table->integer('location_id')->unsigned();
            $table->primary(['banner_zone_id','location_id'], 'jangrb_bnnr_zone_location');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_banner_zones_locations');
    }
}
