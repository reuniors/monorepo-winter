<?php namespace Reuniors\Delivery\Updates;

use Illuminate\Support\Facades\Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsDeliveryOrders extends Migration
{
    public function up()
    {
        Schema::create('reuniors_delivery_orders', function($table)
        {
            $table->engine = 'InnoDB';
            $table->string('id', 32);
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->integer('user_id')->nullable()->unsigned();
            $table->integer('driver_id')->nullable()->unsigned();
            $table->primary(['id']);

            $table->foreign('user_id', 'delivery_o_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->foreign('driver_id', 'delivery_o_driver_id')
                ->references('id')
                ->on('reuniors_delivery_drivers')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_delivery_orders');
    }
}
