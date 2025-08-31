<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsWorkingHours3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_working_hours', function($table)
        {
            $table->text('pauses')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_reservations_working_hours', function($table)
        {
            $table->dropColumn('pauses');
        });
    }
} 