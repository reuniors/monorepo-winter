<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsCalendarEvents extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_calendar_events', function ($table) {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('calendar_event_id')->unsigned();
            $table->integer('client_reservation_id')->unsigned()->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            // Indexes
            $table->index(['calendar_event_id'], 'res_ce_event_idx');
            $table->index(['client_reservation_id'], 'res_ce_reservation_idx');
            $table->unique(['calendar_event_id'], 'res_ce_unique');

            // Foreign keys
            $table->foreign('calendar_event_id', 'res_ce_event_fk')
                ->references('id')
                ->on('reuniors_calendar_events')
                ->onDelete('cascade');

            $table->foreign('client_reservation_id', 'res_ce_reservation_fk')
                ->references('id')
                ->on('reuniors_reservations_client_reservations')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_calendar_events');
    }
}
