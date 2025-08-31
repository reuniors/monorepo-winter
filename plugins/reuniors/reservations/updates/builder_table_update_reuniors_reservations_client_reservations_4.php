<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsClientReservations4 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_client_reservations', function($table)
        {
            $table->integer('created_by')->nullable()->unsigned();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_client_reservations', function($table)
        {
            $table->dropColumn('created_by');
        });
    }
}
