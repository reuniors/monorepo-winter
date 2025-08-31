<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicPlacesTags extends Migration
{
    public function up()
{
    Schema::create('reuniors_evodic_places_tags', function($table)
    {
        $table->engine = 'InnoDB';
        $table->integer('place_id')->unsigned();
        $table->integer('tag_id')->unsigned();
        
        $table->foreign('place_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_evodic_places');

            $table->foreign('tag_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_evodic_tags');
        
        $table->primary(['place_id','tag_id']);
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_evodic_places_tags');
}
}
