<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicAddresses extends Migration
{
    public function up()
    {
        Schema::create('reuniors_evodic_addresses', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->integer('city_id')->nullable()->unsigned();
            $table->integer('country_id')->nullable()->unsigned();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('street')->nullable();
            $table->string('street_number')->nullable();
            $table->text('additional_info')->nullable();
            $table->text('metadata')->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_evodic_addresses');
    }
}
