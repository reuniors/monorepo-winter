<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocations10 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->renameColumn('bagde_tag_group_id', 'badge_tag_group_id');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->renameColumn('badge_tag_group_id', 'bagde_tag_group_id');
        });
    }
}
