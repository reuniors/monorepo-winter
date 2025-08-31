<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsNotifications extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_notifications', function($table)
        {
            $table->text('description')->nullable(false)->unsigned(false)->default(null)->change();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_notifications', function($table)
        {
            $table->integer('description')->nullable(false)->unsigned(false)->default(null)->change();
        });
    }
}
