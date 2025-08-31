<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkBannerZones extends Migration
{
    public function up()
    {
        Schema::rename('reuniors_knk_banner_zone', 'reuniors_knk_banner_zones');
    }

    public function down()
    {
        Schema::rename('reuniors_knk_banner_zones', 'reuniors_knk_banner_zone');
    }
}
