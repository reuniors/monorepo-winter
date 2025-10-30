<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableChangePriceToDoubleLocationWorkersServices extends Migration
{
    public function up()
    {
        // Change column type from decimal to double
        Schema::table('reuniors_reservations_location_workers_services', function($table)
        {
            $table->double('price')->nullable()->change();
        });
    }

    public function down()
    {
        // Change column type back to decimal
        Schema::table('reuniors_reservations_location_workers_services', function($table)
        {
            $table->decimal('price', 10, 2)->nullable()->change();
        });
    }
}

