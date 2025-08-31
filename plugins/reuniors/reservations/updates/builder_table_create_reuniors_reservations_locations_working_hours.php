<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsLocationsWorkingHours extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_locations_working_hours', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('location_id')->unsigned();
            $table->integer('working_hours_id')->unsigned();
            $table->primary(['location_id','working_hours_id']);
    
                $table->foreign('working_hours_id', 'res_working_hours_id')
                    ->constrained()
                    ->cascadeOnDelete()
                    ->references('id')
                    ->on('reuniors_reservations_working_hours');
    
                $table->foreign('location_id', 'res_location_id')
                    ->constrained()
                    ->cascadeOnDelete()
                    ->references('id')
                    ->on('reuniors_reservations_locations');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_locations_working_hours');
    }
}
