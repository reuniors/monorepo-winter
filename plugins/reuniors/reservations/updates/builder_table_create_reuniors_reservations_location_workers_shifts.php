<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsLocationWorkersShifts extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_location_workers_shifts', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('location_worker_id')->unsigned();
            $table->integer('working_day_id')->unsigned();
            $table->smallInteger('shift')->nullable()->unsigned();
            $table->smallInteger('status')->nullable()->unsigned();

            $table->foreign('working_day_id', 'res_pl_wh_working_day_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_reservations_working_days');

            $table->foreign('location_worker_id', 'res_pl_wh_location_worker_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_reservations_location_workers');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_location_workers_shifts');
    }
}
