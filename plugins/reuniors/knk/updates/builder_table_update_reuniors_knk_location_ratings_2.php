<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationRatings2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_location_ratings', function($table)
        {
            $table->integer('location_id')->unsigned();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_location_ratings', function($table)
        {
            $table->dropColumn('location_id');
        });
    }
}
