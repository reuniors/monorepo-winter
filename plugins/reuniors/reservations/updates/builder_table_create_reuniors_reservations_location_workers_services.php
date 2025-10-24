<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsLocationWorkersServices extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_location_workers_services', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned(); // Separate ID needed for complex pivot
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->integer('location_worker_id')->unsigned();
            $table->integer('service_id')->unsigned();
            $table->integer('location_id')->unsigned();
            $table->decimal('price', 10, 2)->nullable(); // Custom field
            $table->integer('duration')->nullable(); // Custom field
            $table->integer('sort_order')->nullable(); // Custom field
            $table->tinyInteger('active')->unsigned()->default(1);
            
            // Indexes
            $table->index(['location_worker_id'], 'lws_location_worker_idx');
            $table->index(['service_id'], 'lws_service_idx');
            $table->index(['location_id'], 'lws_location_idx');
            $table->unique(['location_worker_id', 'service_id', 'location_id'], 'worker_service_location_unique');
            
            // Foreign keys
            $table->foreign('location_worker_id', 'lws_location_worker_id')
                ->references('id')
                ->on('reuniors_reservations_location_workers')
                ->onDelete('cascade');
            $table->foreign('service_id', 'lws_service_id')
                ->references('id')
                ->on('reuniors_reservations_services')
                ->onDelete('cascade');
            $table->foreign('location_id', 'lws_location_id')
                ->references('id')
                ->on('reuniors_reservations_locations')
                ->onDelete('cascade');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_location_workers_services');
    }
}
