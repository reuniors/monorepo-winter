<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicCountries extends Migration
{
    public function up()
    {
        Schema::create('reuniors_evodic_countries', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('name');
            $table->string('slug');
            $table->string('description')->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_evodic_countries');
    }
}
