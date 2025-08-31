<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsNotifications extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_notifications', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->smallInteger('status')->unsigned();
            $table->integer('description');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_notifications');
    }
}
