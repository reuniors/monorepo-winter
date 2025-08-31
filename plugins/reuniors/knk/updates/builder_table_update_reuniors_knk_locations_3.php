<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocations3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->smallInteger('is_child')->unsigned()->default(0);
            $table->integer('parent_id')->nullable()->unsigned();
            $table->text('address_data')->nullable();
            $table->text('phone_data')->nullable();
            $table->text('working_hours_data')->nullable();
            $table->text('other_info')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->dropColumn('is_child');
            $table->dropColumn('parent_id');
            $table->dropColumn('address_data');
            $table->dropColumn('phone_data');
            $table->dropColumn('working_hours_data');
            $table->dropColumn('other_info');
        });
    }
}
