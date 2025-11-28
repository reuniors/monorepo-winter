<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsGoogleCalendarConnections extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_google_calendar_connections', function ($table) {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('location_id')->unsigned()->nullable();
            $table->integer('location_worker_id')->unsigned()->nullable();
            $table->string('google_calendar_id')->nullable();
            $table->string('google_email');
            $table->text('access_token');
            $table->text('refresh_token')->nullable();
            $table->timestamp('token_expires_at')->nullable();
            $table->string('channel_id')->nullable();
            $table->string('resource_id')->nullable();
            $table->timestamp('webhook_expires_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('sync_reservations_to_google')->default(true);
            $table->boolean('sync_google_to_reservations')->default(true);
            $table->boolean('block_overlapping_slots')->default(true);
            $table->boolean('allow_overlapping_with_approval')->default(false);
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();

            // Indexes
            $table->index(['location_id'], 'res_gcc_location_idx');
            $table->index(['location_worker_id'], 'res_gcc_worker_idx');
            $table->unique(['location_id', 'location_worker_id'], 'res_gcc_location_worker_unique');

            // Foreign keys
            $table->foreign('location_id', 'res_gcc_location_fk')
                ->references('id')
                ->on('reuniors_reservations_locations')
                ->onDelete('cascade');

            $table->foreign('location_worker_id', 'res_gcc_worker_fk')
                ->references('id')
                ->on('reuniors_reservations_location_workers')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_google_calendar_connections');
    }
}
