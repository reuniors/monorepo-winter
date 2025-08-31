<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsLocations extends Migration
{
    public function up()
{
    Schema::create('reuniors_reservations_locations', function($table)
    {
        $table->engine = 'InnoDB';
        $table->increments('id')->unsigned();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
        $table->timestamp('deleted_at')->nullable();
        $table->string('title');
        $table->string('name');
        $table->string('slug');
        $table->text('description')->nullable();
        $table->text('metadata')->nullable();
        $table->smallInteger('active')->default(0);
        $table->dateTime('active_at')->nullable();
        $table->dateTime('deactivate_at')->nullable();
        $table->integer('main_owner_id')->nullable()->unsigned();
        $table->integer('city_id')->nullable()->unsigned();
        $table->text('address_data')->nullable();
        $table->text('phone_data')->nullable();
        $table->double('address_lat', 10, 0)->nullable();
        $table->double('address_long', 10, 0)->nullable();
        $table->string('snippet', 1000)->nullable();
        $table->string('wifi_password')->nullable();
        $table->integer('type');
        $table->string('google_map_url')->nullable();
        $table->text('settings')->nullable();
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_reservations_locations');
}
}
