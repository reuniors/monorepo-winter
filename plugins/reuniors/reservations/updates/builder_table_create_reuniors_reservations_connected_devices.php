<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsConnectedDevices extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_connected_devices', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->text('tokens');
            $table->integer('user_id')->unsigned();
            $table->integer('location_id')->nullable()->unsigned();

            $table->foreign('user_id', 'res_cd_user_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('users');

            $table->foreign('location_id', 'res_cd_location_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_reservations_locations');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_connected_devices');
    }
}
