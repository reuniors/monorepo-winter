<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableMakeOriginalFieldsNullableReuniorsBotovi extends Migration
{
    public function up()
    {
        // Make original date/time fields nullable in people table
        Schema::table('reuniors_botovi_people', function($table)
        {
            $table->datetime('active_at')->nullable()->change();
            $table->datetime('deactivate_at')->nullable()->change();
            $table->datetime('verification_date')->nullable()->change();
            $table->datetime('last_activity_at')->nullable()->change();
        });

        // Make original date/time fields nullable in events table
        Schema::table('reuniors_botovi_events', function($table)
        {
            $table->datetime('event_date')->nullable()->change();
        });

        // Make original date/time fields nullable in notifications table
        Schema::table('reuniors_botovi_notifications', function($table)
        {
            $table->datetime('read_at')->nullable()->change();
        });

        // Make original date/time fields nullable in person reports table
        Schema::table('reuniors_botovi_person_reports', function($table)
        {
            $table->datetime('resolved_at')->nullable()->change();
        });

        // Make original date/time fields nullable in person flags table
        Schema::table('reuniors_botovi_person_flags', function($table)
        {
            $table->datetime('resolved_at')->nullable()->change();
        });

        // Make original date/time fields nullable in change requests table
        Schema::table('reuniors_botovi_change_requests', function($table)
        {
            $table->date('scheduled_date')->nullable()->change();
        });
    }

    public function down()
    {
        // Revert original date/time fields to not nullable in people table
        Schema::table('reuniors_botovi_people', function($table)
        {
            $table->datetime('active_at')->nullable(false)->change();
            $table->datetime('deactivate_at')->nullable(false)->change();
            $table->datetime('verification_date')->nullable(false)->change();
            $table->datetime('last_activity_at')->nullable(false)->change();
        });

        // Revert original date/time fields to not nullable in events table
        Schema::table('reuniors_botovi_events', function($table)
        {
            $table->datetime('event_date')->nullable(false)->change();
        });

        // Revert original date/time fields to not nullable in notifications table
        Schema::table('reuniors_botovi_notifications', function($table)
        {
            $table->datetime('read_at')->nullable(false)->change();
        });

        // Revert original date/time fields to not nullable in person reports table
        Schema::table('reuniors_botovi_person_reports', function($table)
        {
            $table->datetime('resolved_at')->nullable(false)->change();
        });

        // Revert original date/time fields to not nullable in person flags table
        Schema::table('reuniors_botovi_person_flags', function($table)
        {
            $table->datetime('resolved_at')->nullable(false)->change();
        });

        // Revert original date/time fields to not nullable in change requests table
        Schema::table('reuniors_botovi_change_requests', function($table)
        {
            $table->date('scheduled_date')->nullable(false)->change();
        });
    }
}
