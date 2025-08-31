<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationRelatedLocations extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_location_related_locations', function($table)
        {
            $table->integer('location_id')->unsigned()->change();
            $table->integer('location_related_id')->unsigned()->change();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_location_related_locations', function($table)
        {
            $table->integer('location_id')->unsigned(false)->change();
            $table->integer('location_related_id')->unsigned(false)->change();
        });
    }
}
