<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsCalendarConnections extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_calendar_connections', function ($table) {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('calendar_connection_id')->unsigned();
            $table->integer('location_id')->unsigned()->nullable();
            $table->integer('location_worker_id')->unsigned()->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();

            // Indexes
            $table->index(['calendar_connection_id'], 'res_cc_calendar_conn_idx');
            $table->index(['location_id'], 'res_cc_location_idx');
            $table->index(['location_worker_id'], 'res_cc_worker_idx');
            $table->unique(['calendar_connection_id', 'location_id', 'location_worker_id'], 'res_cc_unique');

            // Foreign keys
            $table->foreign('calendar_connection_id', 'res_cc_calendar_conn_fk')
                ->references('id')
                ->on('reuniors_calendar_connections')
                ->onDelete('cascade');

            $table->foreign('location_id', 'res_cc_location_fk')
                ->references('id')
                ->on('reuniors_reservations_locations')
                ->onDelete('cascade');

            $table->foreign('location_worker_id', 'res_cc_worker_fk')
                ->references('id')
                ->on('reuniors_reservations_location_workers')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_calendar_connections');
    }
}
