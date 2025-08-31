<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkBanners extends Migration
{
    public function up()
    {
        Schema::rename('reuniors_knk_banner', 'reuniors_knk_banners');
    }

    public function down()
    {
        Schema::rename('reuniors_knk_banners', 'reuniors_knk_banner');
    }
}
