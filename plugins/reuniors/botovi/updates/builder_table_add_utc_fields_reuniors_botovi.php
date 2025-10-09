<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddUtcFieldsReuniorsBotovi extends Migration
{
    public function up()
    {
        // Add UTC fields to people table
        Schema::table('reuniors_botovi_people', function($table)
        {
            $table->datetime('active_at_utc')->nullable();
            $table->datetime('deactivate_at_utc')->nullable();
            $table->datetime('verification_date_utc')->nullable();
            $table->datetime('last_activity_at_utc')->nullable();
        });

        // Add UTC fields to events table
        Schema::table('reuniors_botovi_events', function($table)
        {
            $table->datetime('event_date_utc')->nullable();
        });

        // Add UTC fields to notifications table
        Schema::table('reuniors_botovi_notifications', function($table)
        {
            $table->datetime('read_at_utc')->nullable();
        });

        // Add UTC fields to person reports table
        Schema::table('reuniors_botovi_person_reports', function($table)
        {
            $table->datetime('resolved_at_utc')->nullable();
        });

        // Add UTC fields to person flags table
        Schema::table('reuniors_botovi_person_flags', function($table)
        {
            $table->datetime('resolved_at_utc')->nullable();
        });

        // Add UTC fields to change requests table
        Schema::table('reuniors_botovi_change_requests', function($table)
        {
            $table->date('scheduled_date_utc')->nullable();
        });
    }

    public function down()
    {
        // Remove UTC fields from people table
        Schema::table('reuniors_botovi_people', function($table)
        {
            $table->dropColumn(['active_at_utc', 'deactivate_at_utc', 'verification_date_utc', 'last_activity_at_utc']);
        });

        // Remove UTC fields from events table
        Schema::table('reuniors_botovi_events', function($table)
        {
            $table->dropColumn('event_date_utc');
        });

        // Remove UTC fields from notifications table
        Schema::table('reuniors_botovi_notifications', function($table)
        {
            $table->dropColumn('read_at_utc');
        });

        // Remove UTC fields from person reports table
        Schema::table('reuniors_botovi_person_reports', function($table)
        {
            $table->dropColumn('resolved_at_utc');
        });

        // Remove UTC fields from person flags table
        Schema::table('reuniors_botovi_person_flags', function($table)
        {
            $table->dropColumn('resolved_at_utc');
        });

        // Remove UTC fields from change requests table
        Schema::table('reuniors_botovi_change_requests', function($table)
        {
            $table->dropColumn('scheduled_date_utc');
        });
    }
}
