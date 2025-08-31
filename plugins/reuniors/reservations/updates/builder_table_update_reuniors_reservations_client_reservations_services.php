<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsClientReservationsServices extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_client_reservations_services', function($table)
        {
            $table->integer('quantity')->unsigned()->default(1);
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_client_reservations_services', function($table)
        {
            $table->dropColumn('quantity');
        });
    }
}
