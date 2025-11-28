<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsGoogleCalendarOverlapRequests extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_google_calendar_overlap_requests', function ($table) {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('google_calendar_event_id')->unsigned();
            $table->integer('client_reservation_id')->unsigned()->nullable();
            $table->timestamp('requested_start_time_utc');
            $table->integer('requested_duration_minutes');
            $table->string('status')->default('pending');
            $table->text('user_response')->nullable();
            $table->integer('responded_by')->unsigned()->nullable();
            $table->timestamp('responded_at')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            // Indexes
            $table->index(['google_calendar_event_id'], 'res_or_event_idx');
            $table->index(['client_reservation_id'], 'res_or_reservation_idx');
            $table->index(['responded_by'], 'res_or_user_idx');

            // Foreign keys
            $table->foreign('google_calendar_event_id', 'res_or_event_fk')
                ->references('id')
                ->on('reuniors_reservations_google_calendar_events')
                ->onDelete('cascade');

            $table->foreign('client_reservation_id', 'res_or_reservation_fk')
                ->references('id')
                ->on('reuniors_reservations_client_reservations')
                ->onDelete('set null');

            $table->foreign('responded_by', 'res_or_user_fk')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_google_calendar_overlap_requests');
    }
}
