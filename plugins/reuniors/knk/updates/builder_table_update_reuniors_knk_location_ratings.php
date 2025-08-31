<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationRatings extends Migration
{
    public function up()
    {
        Schema::rename('reuniors_knk_location_rating', 'reuniors_knk_location_ratings');
    }

    public function down()
    {
        Schema::rename('reuniors_knk_location_ratings', 'reuniors_knk_location_rating');
    }
}
