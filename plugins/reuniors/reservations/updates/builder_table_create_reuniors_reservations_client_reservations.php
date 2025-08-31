<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsClientReservations extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_client_reservations', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->integer('location_id')->unsigned();
            $table->integer('location_worker_id')->unsigned();
            $table->dateTime('date');
            $table->integer('services_duration')->unsigned();
            $table->double('services_cost', 10, 0);
            $table->integer('status')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->string('full_name');
            $table->string('email')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('notice', 1000)->nullable();
            $table->string('ip', 300)->nullable();
            $table->string('ip_forwarded', 300)->nullable();
            $table->string('user_agent', 300)->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_client_reservations');
    }
}
