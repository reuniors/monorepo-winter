<?php namespace Reuniors\Delivery\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsDeliveryDrivers extends Migration
{
    public function up()
    {
        Schema::create('reuniors_delivery_drivers', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->integer('working_city_id');
            $table->string('status');
            $table->smallInteger('is_active')->unsigned()->default(0);
            $table->integer('user_id')->nullable()->unsigned();
            
            $table->foreign('user_id', 'delivery_d_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_delivery_drivers');
    }
}
