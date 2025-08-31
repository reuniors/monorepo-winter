<?php

namespace Reuniors\Reservations\Updates;

use Winter\Storm\Database\Updates\Migration;
use Schema;

class BuilderTableUpdateReuniorsReservationsClients3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_clients', function ($table) {
            $table->string('date_of_birth')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_reservations_clients', function ($table) {
            $table->dropColumn('date_of_birth');
        });
    }
}
