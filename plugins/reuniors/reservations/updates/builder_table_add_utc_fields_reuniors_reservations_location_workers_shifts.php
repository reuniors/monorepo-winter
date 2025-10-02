<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddUtcFieldsReuniorsReservationsLocationWorkersShifts extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_location_workers_shifts', function($table)
        {
            $table->time('time_from_utc')->nullable();
            $table->time('time_to_utc')->nullable();
            $table->date('date_utc')->nullable();
            $table->text('pauses_utc')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_location_workers_shifts', function($table)
        {
            $table->dropColumn([
                'time_from_utc',
                'time_to_utc',
                'date_utc',
                'pauses_utc'
            ]);
        });
    }
}
