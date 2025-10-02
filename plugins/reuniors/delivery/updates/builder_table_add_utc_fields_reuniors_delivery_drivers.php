<?php namespace Reuniors\Delivery\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddUtcFieldsReuniorsDeliveryDrivers extends Migration
{
    public function up()
    {
        Schema::table('reuniors_delivery_drivers', function($table)
        {
            $table->dateTime('last_seen_utc')->nullable();
            $table->timestamp('login_date_code_utc')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_delivery_drivers', function($table)
        {
            $table->dropColumn([
                'last_seen_utc',
                'login_date_code_utc'
            ]);
        });
    }
}
