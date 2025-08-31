<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicLocationOwnersLocations extends Migration
{
    public function up()
{
    Schema::create('reuniors_evodic_location_owners_locations', function($table)
    {
        $table->engine = 'InnoDB';
        $table->integer('location_owner_id')->unsigned();
        $table->integer('location_id')->unsigned();
        $table->primary(['location_owner_id','location_id']);
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_evodic_location_owners_locations');
}
}
