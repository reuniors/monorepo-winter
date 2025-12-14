<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsServiceCategoryLocationWorker extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_service_category_location_worker', function ($table) {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('service_category_id')->unsigned();
            $table->integer('location_worker_id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            $table->foreign('service_category_id', 'rr_sc_lw_category_id')
                ->references('id')
                ->on('reuniors_reservations_service_categories')
                ->onDelete('cascade');

            $table->foreign('location_worker_id', 'rr_sc_lw_worker_id')
                ->references('id')
                ->on('reuniors_reservations_location_workers')
                ->onDelete('cascade');

            // Ensure unique combination
            $table->unique(['service_category_id', 'location_worker_id'], 'rr_sc_lw_unique');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_service_category_location_worker');
    }
}

