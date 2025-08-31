<?php namespace Reuniors\Delivery\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsDeliveryOrders2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_delivery_orders', function($table)
        {
            $table->string('id', 36)->change();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_delivery_orders', function($table)
        {
            $table->string('id', 32)->change();
        });
    }
}
