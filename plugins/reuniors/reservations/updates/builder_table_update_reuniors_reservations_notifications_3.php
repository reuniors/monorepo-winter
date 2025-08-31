<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsNotifications3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_notifications', function($table)
        {
            $table->smallInteger('status')->nullable()->change();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_notifications', function($table)
        {
            $table->smallInteger('status')->nullable(false)->change();
        });
    }
}
