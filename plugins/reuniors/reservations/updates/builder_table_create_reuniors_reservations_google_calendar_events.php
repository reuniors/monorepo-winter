<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsGoogleCalendarEvents extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_google_calendar_events', function ($table) {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('client_reservation_id')->unsigned()->nullable();
            $table->integer('google_calendar_connection_id')->unsigned();
            $table->string('google_event_id');
            $table->string('google_calendar_id');
            $table->string('event_type')->default('reservation');
            $table->boolean('is_external')->default(false);
            $table->boolean('allows_overlap')->default(false);
            $table->timestamp('start_time_utc');
            $table->timestamp('end_time_utc');
            $table->string('summary')->nullable();
            $table->text('description')->nullable();
            $table->string('status')->default('confirmed');
            $table->timestamp('last_synced_at')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();

            // Indexes
            $table->index(['client_reservation_id'], 'res_ge_reservation_idx');
            $table->index(['google_calendar_connection_id'], 'res_ge_connection_idx');
            $table->index(['start_time_utc', 'end_time_utc'], 'res_ge_time_range_idx');
            $table->unique(['google_event_id'], 'res_ge_google_event_unique');

            // Foreign keys
            $table->foreign('client_reservation_id', 'res_ge_reservation_fk')
                ->references('id')
                ->on('reuniors_reservations_client_reservations')
                ->onDelete('set null');

            $table->foreign('google_calendar_connection_id', 'res_ge_connection_fk')
                ->references('id')
                ->on('reuniors_reservations_google_calendar_connections')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_google_calendar_events');
    }
}
