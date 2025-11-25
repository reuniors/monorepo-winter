<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsServiceCategories extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_service_categories', function ($table) {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('location_id')->unsigned();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->boolean('active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('location_id', 'rr_sc_location_id')
                ->references('id')
                ->on('reuniors_reservations_locations')
                ->onDelete('cascade');
        });

        Schema::create('reuniors_reservations_service_category_group', function ($table) {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->integer('service_category_id')->unsigned();
            $table->integer('service_group_id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            $table->foreign('service_category_id', 'rr_scg_category_id')
                ->references('id')
                ->on('reuniors_reservations_service_categories')
                ->onDelete('cascade');

            $table->foreign('service_group_id', 'rr_scg_group_id')
                ->references('id')
                ->on('reuniors_reservations_services_groups')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_service_category_group');
        Schema::dropIfExists('reuniors_reservations_service_categories');
    }
}
