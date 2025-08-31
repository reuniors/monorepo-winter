<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsLocationWorkerDiscounts extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_location_worker_discounts', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->date('date_from');
            $table->date('date_to');
            $table->double('discount_value', 10, 0);
            $table->smallInteger('in_percent')->unsigned()->default(1);
            $table->integer('location_worker_id')->unsigned();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_location_worker_discounts');
    }
}
