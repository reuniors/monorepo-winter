<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicCities extends Migration
{
    public function up()
    {
        Schema::create('reuniors_evodic_cities', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->integer('country_id')->unsigned();
            $table->string('name');
            $table->string('slug');
            $table->text('description');
            $table->foreign('country_id')->references('id')->on('reuniors_evodic_countries')->onDelete('cascade');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_evodic_cities');
    }
}
