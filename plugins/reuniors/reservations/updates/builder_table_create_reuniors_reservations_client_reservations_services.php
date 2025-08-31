<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsClientReservationsServices extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_client_reservations_services', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('client_reservation_id')->unsigned();
            $table->integer('service_id')->unsigned();
            $table->primary(['client_reservation_id','service_id']);
            $table->foreign('client_reservation_id', 'res_c_r_client_reservation_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_reservations_client_reservations');
    
            $table->foreign('service_id', 'res_c_r_service_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_reservations_services');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_client_reservations_services');
    }
}
