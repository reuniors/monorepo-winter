<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableMakeOriginalFieldsNullableReuniorsReservations extends Migration
{
    public function up()
    {
        // Make original fields nullable in working_hours table
        Schema::table('reuniors_reservations_working_hours', function($table)
        {
            $table->time('time_from')->nullable()->change();
            $table->time('time_to')->nullable()->change();
        });

        // Make original fields nullable in location_workers_shifts table
        Schema::table('reuniors_reservations_location_workers_shifts', function($table)
        {
            $table->date('date')->nullable()->change();
            $table->time('time_from')->nullable()->change();
            $table->time('time_to')->nullable()->change();
        });

        // Make original fields nullable in client_reservations table
        Schema::table('reuniors_reservations_client_reservations', function($table)
        {
            $table->date('date')->nullable()->change();
        });

        // Make original fields nullable in location_worker_discounts table
        Schema::table('reuniors_reservations_location_worker_discounts', function($table)
        {
            $table->date('date_from')->nullable()->change();
            $table->date('date_to')->nullable()->change();
        });

        // Make original fields nullable in news table
        Schema::table('reuniors_reservations_news', function($table)
        {
            $table->datetime('activated_at')->nullable()->change();
            $table->datetime('deactivated_at')->nullable()->change();
        });
    }
    
    public function down()
    {
        // Revert working_hours table
        Schema::table('reuniors_reservations_working_hours', function($table)
        {
            $table->time('time_from')->nullable(false)->change();
            $table->time('time_to')->nullable(false)->change();
        });

        // Revert location_workers_shifts table
        Schema::table('reuniors_reservations_location_workers_shifts', function($table)
        {
            $table->date('date')->nullable(false)->change();
            $table->time('time_from')->nullable(false)->change();
            $table->time('time_to')->nullable(false)->change();
        });

        // Revert client_reservations table
        Schema::table('reuniors_reservations_client_reservations', function($table)
        {
            $table->date('date')->nullable(false)->change();
        });

        // Revert location_worker_discounts table
        Schema::table('reuniors_reservations_location_worker_discounts', function($table)
        {
            $table->date('date_from')->nullable(false)->change();
            $table->date('date_to')->nullable(false)->change();
        });

        // Revert news table
        Schema::table('reuniors_reservations_news', function($table)
        {
            $table->datetime('activated_at')->nullable(false)->change();
            $table->datetime('deactivated_at')->nullable(false)->change();
        });
    }
}
