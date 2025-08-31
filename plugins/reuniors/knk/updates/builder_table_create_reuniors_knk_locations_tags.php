<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkLocationsTags extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_locations_tags', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('location_id')->unsigned();
            $table->integer('tag_id')->unsigned();
            $table->primary(['location_id','tag_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_locations_tags');
    }
}
