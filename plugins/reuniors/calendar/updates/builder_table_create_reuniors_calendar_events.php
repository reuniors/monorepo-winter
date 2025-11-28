<?php namespace Reuniors\Calendar\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsCalendarEvents extends Migration
{
    public function up()
    {
        Schema::create('reuniors_calendar_events', function ($table) {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('calendar_connection_id')->unsigned();
            $table->string('provider_event_id'); // Event ID in provider's system
            $table->string('provider_calendar_id');
            $table->string('event_type')->default('reservation'); // 'reservation' | 'external' | 'manual'
            $table->boolean('is_external')->default(false);
            $table->boolean('allows_overlap')->default(false);
            $table->timestamp('start_time_utc');
            $table->timestamp('end_time_utc');
            $table->string('summary')->nullable();
            $table->text('description')->nullable();
            $table->string('status')->default('confirmed'); // 'confirmed' | 'tentative' | 'cancelled'
            $table->timestamp('last_synced_at')->nullable();
            $table->text('metadata')->nullable(); // JSON for provider-specific data
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();

            $table
                ->foreign('calendar_connection_id')
                ->references('id')
                ->on('reuniors_calendar_connections')
                ->onDelete('cascade');

            $table
                ->unique(
                    ['provider_event_id', 'calendar_connection_id'],
                    'cal_ev_provider_conn_unique'
                );

            $table
                ->index(
                    ['start_time_utc', 'end_time_utc'],
                    'cal_ev_time_range_index'
                );
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_calendar_events');
    }
}
