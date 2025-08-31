<?php

namespace Reuniors\Reservations\Updates;

use Winter\Storm\Database\Updates\Migration;
use Schema;

class BuilderTableUpdateReuniorsReservationsClients4 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_clients', function ($table) {
            $table->text('settings')->nullable();
            $table->string('lang')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_reservations_clients', function ($table) {
            $table->dropColumn(['settings', 'lang']);
        });
    }
}
