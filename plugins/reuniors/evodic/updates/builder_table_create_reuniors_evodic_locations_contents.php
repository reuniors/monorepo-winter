<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicLocationsContents extends Migration
{
    public function up()
{
    Schema::create('reuniors_evodic_locations_contents', function($table)
    {
        $table->engine = 'InnoDB';
        $table->integer('location_id')->unsigned();
        $table->integer('content_id')->unsigned();
        $table->primary(['location_id','content_id']);
        $table->foreign(
                'location_id',
                'evodic_loc_contents_loc_id'
            )
            ->references('id')
            ->on('reuniors_evodic_locations')
            ->onDelete('cascade');
        $table->foreign(
                'content_id',
                'evodic_loc_contents_con_id'
            )
            ->references('id')
            ->on('reuniors_evodic_contents')
            ->onDelete('cascade');
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_evodic_locations_contents');
}
}
