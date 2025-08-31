<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsServices extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_services', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('deleted_at')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->integer('group_id')->unsigned();
            $table->string('title');
            $table->string('name');
            $table->string('slug');
            $table->smallInteger('active')->unsigned();
            $table->integer('duration');
            $table->double('price', 10, 0);
            $table->integer('currency')->unsigned()->default(1);
            $table->integer('sort_order')->unsigned();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_services');
    }
}
