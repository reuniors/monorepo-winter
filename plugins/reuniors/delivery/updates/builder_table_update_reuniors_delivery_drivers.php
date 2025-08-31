<?php namespace Reuniors\Delivery\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsDeliveryDrivers extends Migration
{
    public function up()
    {
        Schema::table('reuniors_delivery_drivers', function($table)
        {
            $table->string('phone_number')->nullable();
            $table->smallInteger('is_online')->nullable()->unsigned();
            $table->dateTime('last_seen')->nullable();
            $table->timestamp('login_date_code')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_delivery_drivers', function($table)
        {
            $table->dropColumn('phone_number');
            $table->dropColumn('is_online');
            $table->dropColumn('last_seen');
            $table->dropColumn('login_date_code');
        });
    }
}
