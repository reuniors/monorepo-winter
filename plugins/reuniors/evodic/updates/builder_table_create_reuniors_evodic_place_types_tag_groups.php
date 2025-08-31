<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicPlaceTypesTagGroups extends Migration
{
    public function up()
    {
        Schema::create('reuniors_evodic_place_types_tag_groups', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('place_type_id')->unsigned();
            $table->integer('tag_group_id')->unsigned();

            $table->foreign('place_type_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_evodic_place_types');

            $table->foreign('tag_group_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('reuniors_evodic_tag_groups');

            $table->primary(['place_type_id','tag_group_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_evodic_place_types_tag_groups');
    }
}
