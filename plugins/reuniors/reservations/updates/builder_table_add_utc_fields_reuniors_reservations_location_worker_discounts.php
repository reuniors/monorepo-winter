<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddUtcFieldsReuniorsReservationsLocationWorkerDiscounts extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_location_worker_discounts', function($table)
        {
            $table->date('date_from_utc')->nullable();
            $table->date('date_to_utc')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_location_worker_discounts', function($table)
        {
            $table->dropColumn([
                'date_from_utc',
                'date_to_utc'
            ]);
        });
    }
}
