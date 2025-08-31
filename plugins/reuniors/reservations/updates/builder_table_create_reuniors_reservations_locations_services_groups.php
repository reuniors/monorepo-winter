<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsLocationsServicesGroups extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_locations_services_groups', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('location_id')->unsigned();
            $table->integer('services_group_id')->unsigned();
            $table->primary(['location_id','services_group_id']);

            $table->foreign('services_group_id', 'res_l_sg_service_group_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_reservations_services_groups');

            $table->foreign('location_id', 'res_l_sg_location_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_reservations_locations');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_locations_services_groups');
    }
}
