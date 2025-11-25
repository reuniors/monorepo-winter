<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddHasMultipleActivitiesToReuniorsReservationsLocations extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_locations', function ($table) {
            $table->boolean('has_multiple_activities')->nullable()->default(null)->after('is_private');
        });
    }

    public function down()
    {
        Schema::table('reuniors_reservations_locations', function ($table) {
            $table->dropColumn('has_multiple_activities');
        });
    }
}

