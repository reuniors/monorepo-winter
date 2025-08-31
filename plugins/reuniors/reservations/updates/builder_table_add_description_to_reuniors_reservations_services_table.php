<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddDescriptionToReuniorsReservationsServicesTable extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_services', function($table)
        {
            $table->text('description')->nullable()->after('title');
        });
    }

    public function down()
    {
        Schema::table('reuniors_reservations_services', function($table)
        {
            $table->dropColumn('description');
        });
    }
} 