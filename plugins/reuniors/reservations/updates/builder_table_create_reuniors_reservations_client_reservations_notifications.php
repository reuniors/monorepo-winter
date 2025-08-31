<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsClientReservationsNotifications extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_client_reservations_notifications', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('client_reservation_id')->unsigned();
            $table->integer('notification_id')->unsigned();
            $table->primary(['client_reservation_id','notification_id']);
            
            $table->foreign('client_reservation_id', 'res_crn_client_reservation_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_reservations_client_reservations');
    
            $table->foreign('notification_id', 'res_crn_notification_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_reservations_notifications');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_client_reservations_notifications');
    }
}
