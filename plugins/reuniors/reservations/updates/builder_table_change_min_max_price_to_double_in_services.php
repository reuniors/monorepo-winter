<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableChangeMinMaxPriceToDoubleInServices extends Migration
{
    public function up()
    {
        // Change min_price and max_price from decimal to double in services table
        Schema::table('reuniors_reservations_services', function($table)
        {
            $table->double('min_price', 10, 2)->nullable()->change();
            $table->double('max_price', 10, 2)->nullable()->change();
        });

        // Change price from decimal to double in location_workers_services table
        Schema::table('reuniors_reservations_location_workers_services', function($table)
        {
            $table->double('price', 10, 2)->nullable()->change();
        });
    }

    public function down()
    {
        // Revert services table
        Schema::table('reuniors_reservations_services', function($table)
        {
            $table->decimal('min_price', 10, 2)->nullable()->change();
            $table->decimal('max_price', 10, 2)->nullable()->change();
        });

        // Revert location_workers_services table
        Schema::table('reuniors_reservations_location_workers_services', function($table)
        {
            $table->decimal('price', 10, 2)->nullable()->change();
        });
    }
}
