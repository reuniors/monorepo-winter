<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableDeleteReuniorsReservationsWorkingDays extends Migration
{
    public function up()
{
    Schema::dropIfExists('reuniors_reservations_working_days');
}

public function down()
{
    Schema::create('reuniors_reservations_working_days', function($table)
    {
        $table->engine = 'InnoDB';
        $table->increments('id')->unsigned();
        $table->integer('day')->unsigned();
        $table->integer('month')->unsigned();
    });
}
}
