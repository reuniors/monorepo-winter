<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsServicesGroups2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_services_groups', function($table)
        {
            $table->smallInteger('input_type')->unsigned()->default(0);
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_services_groups', function($table)
        {
            $table->dropColumn('input_type');
        });
    }
}
