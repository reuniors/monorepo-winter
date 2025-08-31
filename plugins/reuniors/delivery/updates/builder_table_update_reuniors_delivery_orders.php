<?php namespace Reuniors\Delivery\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsDeliveryOrders extends Migration
{
    public function up()
    {
        Schema::table('reuniors_delivery_orders', function($table)
        {
            $table->string('status');
            $table->string('reject_reason')->nullable();
            $table->integer('location_id')->nullable()->unsigned();
            $table->text('location_data')->nullable();
            $table->string('note', 500)->nullable();
            $table->text('order_items');
            $table->double('price', 10, 0);
            $table->string('promo_code');
            $table->double('original_price', 10, 0);
            $table->text('user_data')->nullable();
            $table->smallInteger('is_delivered')->default(0);
            $table->string('instructions', 500)->nullable();
            $table->string('delivery_status')->nullable();
            $table->integer('city_id')->nullable()->unsigned();

            $table->foreign('location_id', 'delivery_o_location_id')
                ->references('id')
                ->on('reuniors_knk_locations')
                ->onDelete('cascade');
            $table->foreign('city_id', 'delivery_o_city_id')
                ->references('id')
                ->on('reuniors_knk_region_city')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('reuniors_delivery_orders', function($table)
        {
            $table->dropColumn('status');
            $table->dropColumn('reject_reason');
            $table->dropColumn('location_id');
            $table->dropColumn('location_data');
            $table->dropColumn('note');
            $table->dropColumn('order_items');
            $table->dropColumn('price');
            $table->dropColumn('promo_code');
            $table->dropColumn('original_price');
            $table->dropColumn('user_data');
            $table->dropColumn('is_delivered');
            $table->dropColumn('instructions');
        });
    }
}
