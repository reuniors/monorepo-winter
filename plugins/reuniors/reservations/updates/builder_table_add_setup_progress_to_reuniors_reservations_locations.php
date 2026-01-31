<?php namespace Reuniors\Reservations\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableAddSetupProgressToReuniorsReservationsLocations extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_locations', function ($table) {
            $table->text('setup_progress')->nullable()->after('has_multiple_activities');
        });
    }

    public function down()
    {
        Schema::table('reuniors_reservations_locations', function ($table) {
            $table->dropColumn('setup_progress');
        });
    }
}
