<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationRating extends Migration
{
    public function up()
    {
        Schema::rename('reuniors_knk_rating', 'reuniors_knk_location_rating');
    }

    public function down()
    {
        Schema::rename('reuniors_knk_location_rating', 'reuniors_knk_rating');
    }
}
