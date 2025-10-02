<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddUtcFieldsReuniorsReservationsClientReservations extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_client_reservations', function($table)
        {
            $table->dateTime('date_utc')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_client_reservations', function($table)
        {
            $table->dropColumn('date_utc');
        });
    }
}
