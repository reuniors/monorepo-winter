<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsNotifications2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_notifications', function($table)
        {
            $table->integer('location_id')->nullable()->unsigned();

            $table->foreign('location_id', 'res_n_l_location_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_reservations_locations');
        });
    }

    public function down()
    {
        Schema::table('reuniors_reservations_notifications', function($table)
        {
            $table->dropColumn('location_id');
        });
    }
}
