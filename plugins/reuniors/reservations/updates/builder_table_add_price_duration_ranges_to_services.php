<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddPriceDurationRangesToServices extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_services', function($table)
        {
            // Price ranges
            $table->decimal('min_price', 10, 2)->nullable();
            $table->decimal('max_price', 10, 2)->nullable();
            
            // Duration ranges  
            $table->integer('min_duration')->nullable();
            $table->integer('max_duration')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_reservations_services', function($table)
        {
            $table->dropColumn(['min_price', 'max_price', 'min_duration', 'max_duration']);
        });
    }
}
