<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationRatingHistory extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_location_rating_history', function($table)
        {
            $table->double('grade', 10, 0)->default(0);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_location_rating_history', function($table)
        {
            $table->dropColumn('grade');
        });
    }
}
