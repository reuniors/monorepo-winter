<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsLocationWorkers extends Migration
{
    public function up()
{
    Schema::create('reuniors_reservations_location_workers', function($table)
    {
        $table->engine = 'InnoDB';
        $table->increments('id')->unsigned();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
        $table->timestamp('deleted_at')->nullable();
        $table->string('first_name');
        $table->string('last_name');
        $table->integer('city_id')->nullable()->unsigned();
        $table->text('metadata')->nullable();
        $table->integer('user_id')->nullable()->unsigned();
        $table->integer('status')->nullable()->unsigned();
        $table->smallInteger('active')->default(0);
        $table->text('phone_data')->nullable();
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_reservations_location_workers');
}
}
