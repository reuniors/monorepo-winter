<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsClientReservations6 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_client_reservations', function($table)
        {
            $table->double('original_cost', 10, 0)->nullable();
            $table->integer('promo_code_id')->nullable()->unsigned();
            $table->double('discount', 10, 0)->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_client_reservations', function($table)
        {
            $table->dropColumn('original_cost');
            $table->dropColumn('promo_code_id');
            $table->dropColumn('discount');
        });
    }
}
