<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class AddForeignKeysToReuniorsEvodicTagsOtherTagGroupsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('reuniors_evodic_tags_other_tag_groups', function($table)
		{
			$table->foreign('tag_group_id', 'evodic_tags_tags_group_tag_group_id')->references('id')->on('reuniors_evodic_tag_groups')->onUpdate('RESTRICT')->onDelete('CASCADE');
			$table->foreign('tag_id', 'evodic_tags_tags_group_tag_id')->references('id')->on('reuniors_evodic_tags')->onUpdate('RESTRICT')->onDelete('CASCADE');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('reuniors_evodic_tags_other_tag_groups', function($table)
		{
			$table->dropForeign('evodic_tags_tags_group_tag_group_id');
			$table->dropForeign('evodic_tags_tags_group_tag_id');
		});
	}
}
