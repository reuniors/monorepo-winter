<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsReservationsClients extends Migration
{
    public function up()
{
    Schema::table('reuniors_reservations_clients', function($table)
    {
        $table->integer('user_id')->unsigned();
        $table->string('full_name');
        $table->string('email')->nullable();
        $table->string('phone_number')->nullable();
    });
}

public function down()
{
    Schema::table('reuniors_reservations_clients', function($table)
    {
        $table->dropColumn('user_id');
        $table->dropColumn('full_name');
        $table->dropColumn('email');
        $table->dropColumn('phone_number');
    });
}
}
