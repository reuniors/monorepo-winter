<?php namespace Reuniors\Delivery\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableMakeOriginalFieldsNullableReuniorsDelivery extends Migration
{
    public function up()
    {
        // Make original fields nullable in drivers table
        Schema::table('reuniors_delivery_drivers', function($table)
        {
            $table->datetime('last_seen')->nullable()->change();
            $table->string('login_date_code')->nullable()->change();
        });
    }
    
    public function down()
    {
        // Revert drivers table
        Schema::table('reuniors_delivery_drivers', function($table)
        {
            $table->datetime('last_seen')->nullable(false)->change();
            $table->string('login_date_code')->nullable(false)->change();
        });
    }
}
