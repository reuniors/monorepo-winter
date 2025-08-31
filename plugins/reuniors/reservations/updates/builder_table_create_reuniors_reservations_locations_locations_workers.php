<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsLocationsLocationsWorkers extends Migration
{
    public function up()
{
    Schema::create('reuniors_reservations_locations_location_workers', function($table)
    {
        $table->engine = 'InnoDB';
        $table->integer('location_id')->unsigned();
        $table->integer('location_worker_id')->unsigned();
        $table->primary(['location_id','location_worker_id']);

        $table->foreign('location_id', 'res_locations_l_id')
            ->constrained()
            ->cascadeOnDelete()
            ->references('id')
            ->on('reuniors_reservations_locations');

        $table->foreign('location_worker_id', 'res_location_workers_l_w_id')
            ->constrained()
            ->cascadeOnDelete()
            ->references('id')
            ->on('reuniors_reservations_location_workers');
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_reservations_locations_location_workers');
}
}
