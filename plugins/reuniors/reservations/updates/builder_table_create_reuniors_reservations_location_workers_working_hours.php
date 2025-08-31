<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsLocationWorkersWorkingHours extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_location_workers_working_hours', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('location_worker_id')->unsigned();
            $table->integer('working_hours_id')->unsigned();
            $table->primary(['location_worker_id','working_hours_id']);
            
            $table->foreign('working_hours_id', 'res_lw_wh_working_hours_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_reservations_working_hours');
    
            $table->foreign('location_worker_id', 'res_lw_wh_location_worker_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_reservations_location_workers');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_location_workers_working_hours');
    }
}
