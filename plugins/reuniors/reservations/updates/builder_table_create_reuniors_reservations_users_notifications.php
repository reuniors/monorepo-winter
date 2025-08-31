<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsUsersNotifications extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_users_notifications', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('user_id')->unsigned();
            $table->integer('notification_id')->unsigned();
            $table->smallInteger('status')->unsigned();
            $table->primary(['user_id','notification_id']);




            $table->foreign('user_id', 'res_un_user_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('users');

            $table->foreign('notification_id', 'res_un_notification_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_reservations_notifications');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_users_notifications');
    }
}
