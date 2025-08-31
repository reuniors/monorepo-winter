<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsClientReservations extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_client_reservations', function($table)
        {
            $table->integer('discount_id')->nullable()->unsigned();
            $table->double('discount_value', 10, 0)->nullable();
            $table->smallInteger('discount_in_percent')->nullable()->unsigned();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_client_reservations', function($table)
        {
            $table->dropColumn('discount_id');
            $table->dropColumn('discount_value');
            $table->dropColumn('discount_in_percent');
        });
    }
}
