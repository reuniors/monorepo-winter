<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddMaxDiscountPercentToLocationWorkers extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_location_workers', function($table)
        {
            $table->integer('max_discount_percent')->nullable()->after('is_synced_category');
        });
    }

    public function down()
    {
        Schema::table('reuniors_reservations_location_workers', function($table)
        {
            $table->dropColumn('max_discount_percent');
        });
    }
}
