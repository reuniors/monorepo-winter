<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationsCategories extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_locations_categories', function($table)
        {
            $table->integer('location_id')->unsigned()->change();
            $table->integer('category_id')->unsigned()->change();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_locations_categories', function($table)
        {
            $table->integer('location_id')->unsigned(false)->change();
            $table->integer('category_id')->unsigned(false)->change();
        });
    }
}
