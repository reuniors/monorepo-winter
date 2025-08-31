<?php

namespace Reuniors\Reservations\Updates;

use Winter\Storm\Database\Updates\Migration;
use Schema;

class BuilderTableCreateReuniorsReservationsNews extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_news', function ($table) {
            $table->uuid('id')->primary();
            $table->timestamp('activated_at')->nullable();
            $table->timestamp('deactivated_at')->nullable();
            $table->string('title');
            $table->text('description', 1000);
            $table->unsignedSmallInteger('level')->default(1);  // importance level 1-10
            $table->string('type')->default('news');  // news, chyron, alert
            $table->string('status')->default('draft');  // draft, pending, approved
            $table->unsignedInteger('location_id');
            $table->timestamps();

            $table
                ->foreign('location_id', 'fk_rr_news_location_id')
                ->references('id')
                ->on('reuniors_reservations_locations')
                ->onDelete('cascade');

            $table->index(['location_id', 'status']);
            $table->index(['activated_at', 'deactivated_at']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_news');
    }
}
