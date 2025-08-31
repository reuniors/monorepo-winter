<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsPromoCodes extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_promo_codes', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->string('name');
            $table->smallInteger('is_active')->unsigned()->default(0);
            $table->integer('location_id')->nullable()->unsigned();
            $table->dateTime('activate_at');
            $table->dateTime('deactivate_at');
            $table->double('discount_value', 10, 0);
            $table->smallInteger('in_percent')->unsigned()->default(1);
            $table->foreign('location_id', 'res_pc_location_id')
                    ->constrained()
                    ->cascadeOnDelete()
                    ->references('id')
                    ->on('reuniors_reservations_locations');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_promo_codes');
    }
}
