<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsClientReservations5 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_client_reservations', function($table)
        {
            $table->integer('client_id')->nullable()->change();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_client_reservations', function($table)
        {
            $table->integer('client_id')->nullable(false)->change();
        });
    }
}
