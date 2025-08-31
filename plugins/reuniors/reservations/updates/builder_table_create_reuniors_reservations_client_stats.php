<?php

namespace Reuniors\Reservations\Updates;

use Winter\Storm\Database\Updates\Migration;
use Schema;

class BuilderTableCreateReuniorsReservationsClientStats extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_client_stats', function ($table) {
            $table->id();
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('location_id');
            $table->integer('total_reservations')->default(0);
            $table->integer('confirmed_reservations_count')->default(0);
            $table->integer('canceled_reservations_count')->default(0);
            $table->string('last_visit')->nullable();
            $table->integer('cost_sum')->default(0);
            $table->timestamps();
            $table->unique(['client_id', 'location_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_client_stats');
    }
}
