<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsClientReservations3 extends Migration
{
    public function up()
{
    Schema::table('reuniors_reservations_client_reservations', function($table)
    {
        $table->renameColumn('user_id', 'client_id');
        $table->dropColumn('full_name');
        $table->dropColumn('email');
        $table->dropColumn('phone_number');
    });
}

public function down()
{
    Schema::table('reuniors_reservations_client_reservations', function($table)
    {
        $table->renameColumn('client_id', 'user_id');
        $table->string('full_name', 255);
        $table->string('email', 255)->nullable();
        $table->string('phone_number', 255)->nullable();
    });
}
}
