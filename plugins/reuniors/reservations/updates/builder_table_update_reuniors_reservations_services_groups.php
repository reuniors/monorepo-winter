<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsServicesGroups extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_services_groups', function($table)
        {
            $table->integer('sort_order')->default(0)->change();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_services_groups', function($table)
        {
            $table->integer('sort_order')->default(null)->change();
        });
    }
}
