<?php namespace Reuniors\Calendar\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsCalendarOverlapRequests extends Migration
{
    public function up()
    {
        Schema::create('reuniors_calendar_overlap_requests', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('calendar_event_id')->unsigned();
            $table->string('entity_type')->nullable(); // 'Reuniors\Reservations\Models\ClientReservation' etc.
            $table->integer('entity_id')->unsigned()->nullable();
            $table->timestamp('requested_start_time_utc');
            $table->integer('requested_duration_minutes');
            $table->string('status')->default('pending'); // 'pending' | 'approved' | 'rejected'
            $table->text('user_response')->nullable();
            $table->integer('responded_by')->unsigned()->nullable();
            $table->timestamp('responded_at')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            
            $table->foreign('calendar_event_id')->references('id')->on('reuniors_calendar_events')->onDelete('cascade');
            $table->foreign('responded_by')->references('id')->on('users')->onDelete('set null');
            $table->index(['entity_type', 'entity_id']);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_calendar_overlap_requests');
    }
}

