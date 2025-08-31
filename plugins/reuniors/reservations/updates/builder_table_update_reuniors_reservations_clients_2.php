<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsClients2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_clients', function($table)
        {
            $table->integer('user_id')->nullable()->change();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_clients', function($table)
        {
            $table->integer('user_id')->nullable(false)->change();
        });
    }
}
