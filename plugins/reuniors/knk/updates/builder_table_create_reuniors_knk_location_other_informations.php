<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkLocationOtherInformations extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_location_other_informations', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('value', 1000);
            $table->integer('tag_id')->unsigned();
            $table->integer('location_id')->unsigned();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_location_other_informations');
    }
}
