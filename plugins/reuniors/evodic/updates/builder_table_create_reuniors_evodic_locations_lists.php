<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicLocationsLists extends Migration
{
    public function up()
{
    Schema::create('reuniors_evodic_locations_lists', function($table)
    {
        $table->engine = 'InnoDB';
        $table->integer('location_id')->unsigned();
        $table->integer('list_id')->unsigned();
        $table->primary(['location_id','list_id']);
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_evodic_locations_lists');
}
}
