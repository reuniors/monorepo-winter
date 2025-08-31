<?php namespace Reuniors\UserExtended\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsUserextendedAddresses extends Migration
{
    public function up()
    {
        Schema::create('reuniors_userextended_addresses', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('name');
            $table->smallInteger('active')->default(1);
            $table->integer('city_id')->unsigned();
            $table->double('lat', 10, 0);
            $table->double('long', 10, 0);
            $table->integer('sort_order')->default(0);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_userextended_addresses');
    }
}
