<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicTagsOtherTagGroups extends Migration
{
    public function up()
{
    Schema::create('reuniors_evodic_tags_other_tag_groups', function($table)
    {
        $table->engine = 'InnoDB';
		$table->integer('tag_id')->unsigned();
		$table->integer('tag_group_id')->unsigned()->index('knk_tags_tags_group_tag_group_id');
		$table->primary(['tag_id','tag_group_id']);
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_evodic_tags_other_tag_groups');
}
}
